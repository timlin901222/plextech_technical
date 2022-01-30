/* Do NOT add any more modules */
var http = require('http');
var url = require('url');
var database = require("./controllers/pets");

http.createServer(async (req, res) => {
    const q = url.parse(req.url, true);
    
    // TODO: Implement routes from API Spec
    const splice_url = q.pathname.split("/");
    const path = q.pathname;
    

    const output = function(statusCode, body) {
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        if (body !== null) {
            res.write(JSON.stringify(body));
        }
        res.end();
    };

    const split_str = str => str.split(/[\s,]+/).filter(Boolean);
    
    const getBody = async () => {
        const buffers = [];
        for await (const el of req) {
            buffers.push(el);
        }
        const data = Buffer.concat(buffers).toString();
        return JSON.parse(data);
    };

    if (path === "/pet/findByTags" && req.method === "GET") {
        const tagsArr = split_str(q.query.tags);
        const result = database.getPetsByTags(tagsArr);
        if (result == null) {
            output(400, "Invalid tag value (no pets found with supplied tags)");
        } 
        else {
            output(200, result);
        }
    }
    else if (path === "/pet/findByStatus" && req.method === "GET") {
        const q_status = split_str(q.query.status);
        
        const result = database.getPetsByStatus(q_status);
        if (result == null) {
            output(400, "Invalid status value (not in enum)")
        }
        else {
            output(200, result);
        }
    }
    else if (path === "/pet") {
        const petBody = await getBody();
        if (req.method === "POST") {
            const code = database.createPet(petBody);
            
            if (code === -2) {
                output(405, "Validation exception");
            }
            else if (code === -1) {
                output(400, "Pet with id already exists");
            }
            else {
                output(200, petBody);
            }
        }
        else if (req.method === "PUT") {
            const code = database.updatePetById(petBody);
            
            if (code === -2) {
                output(405, "Validation exception");
            }
            else if (code === -1) {
                output(400, "Pet not found");
            }
            else {
                output(200, petBody);
            }
        }
    }
    else if (path.startsWith("/pet/") && splice_url.length === 3) {
        const id = Number(splice_url[2]);

        // id is uint32
        if (isNaN(id) || id < 0 || id > (2 ** 32) - 1) {
            output(400, "Invalid pet id value");
        }
        else if (req.method === "GET") {
            const result = database.getPetById(id);
            if (result === null) {
                output(404, "Pet not found");
            }
            else {
                output(200, result);
            }
        }
        else if (req.method === "DELETE") {
            const result = database.deletePet(id);
            if (result === false) {
                output(404, "Pet not found");
            }
            else {
                output(200, null);
            }
        }
    }
    else {
        output(404, "Not Found")
    }
}).listen(8000);
console.log('Server running at http://localhost:8000');
