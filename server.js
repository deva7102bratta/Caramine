import http from "node:http"
import { getDataFromDB } from "./databases/db.js"
import { sendJSONResponse } from "./utils/sendJSONResponse.js"
import { getDataByParams } from "./utils/getDataByParams.js"

const server = http.createServer(async (req, res)=>{
    const destinations = await getDataFromDB()
    if(req.url === "/api" && req.method === "GET"){
        sendJSONResponse(res, 200, destinations)
    }else if (req.url.startsWith("/api/continent") && req.method === "GET"){
        const continent = req.url.split("/").pop()
        const filterData = getDataByParams(destinations, "continent", continent)
        sendJSONResponse(res, 200, filterData)
    }else if (req.url.startsWith("/api/country") && req.method === "GET"){
        const country = req.url.split("/").pop()
        const filterData = getDataByParams(destinations, "country", country)
        sendJSONResponse(res, 200, filterData)
    }
    else{
        sendJSONResponse(res, 404,
        {
            error:"not found",
            message: "the requested route does not exist"
        })
    }
})

server.listen(5000, ()=>console.log("Server running on port: 5000"))












