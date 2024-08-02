
Technical Description:
- Tech Stack: MEAN 
- Deployment model: 
- Technical challenge: 
- Main func: 
    * 
    * 
    * 

- API DESIGN : BREAD 
    + accepted request header
        * application/content: JSON
        * auth token: JWT

    + accepted request: bread methods (/api/)
        * GET:      /tasks  => return all task in a json format
        * GET:      /tasks/:taskuuid => return the content of a single task
        * POST:     /tasks/new => create a task
        * DELETE:   /tasks/remove/:taskuuid => return a message for operation status   
        * PUT:      /task/edit/:taskuuid => return a message for operation status 
        * PUT:      /task/edit/:taskuuid/set-status => return a message for operation status 

    + full text search method: /api/search/
        * GET:  /?query=&status=


- Notes: the goal is to quickly have a working product
    * let the db init routing there
    * let the fulltext search there (working only on title and on body.textcontent)

- Notes:
    + edit a task: 
        * status: visible|archived|recycled|all
        * template type: v_text, v_items
        * content: title | body
    + the api methods should be robust !!!!!

- Notes:
    * create index with mongoose: movieSchema.index(
        { name : 'text', review : 'text' },
        { weights : { name : 5, review : 2} }
    )