const database = require('../database/accesmethod');

const FulltextSearch = (async (req,res) => {
    let {search_string} = req.query;
    if(search_string == "") return res.status(401).json({message: "Bad input"});
    let dbresults = await database.searchWithFulltextOption(search_string);
    res.status(200).json({message: dbresults});
});

const QueryfieldSearch = (async (req, res)=>{
    let {search_query, status} = req.query;
    if(search_query == "") return res.status(401).json({message: "Bad input"});
    let dbresults = status == null ? await database.searchTaskByTitle(search_query) : await database.searchTaskByTitleWithStatus(search_query, status);
    res.status(200).json({message: dbresults});
});

module.exports = {FulltextSearch, QueryfieldSearch};