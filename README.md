#  =================== WORD AVANCEMENT ===================
                ⚠️ - ❌ - ⭕️ - 💯 - 🔘 - ✅

- System Functionning
    + Client  ➔  API Gateway  ➔   Microservices
    + Microservices:  Auth, TaskAPI, Notification 
    
- Service manual Registry:
    + Express API Gateway - port: 8000
    + Angular Client - port: 5000
    + Express Task API - port: 8001
    + Express Notification - port: 8002
    + Express Auth - port: 8003

- Todo:
    + taskapi arrange and clean the code ✅
    + start with communication between notification task and client 
    + api gateway clean the code. Identify (un)protected route for each service and add them to the conditional gateway security

- Service Communication  Task service ➔  Notification Service  ➔  Client
    * Task! register a task with a reminder
        * when registering a reminder send message to Notification service. event: new-task-reminder
        * receive message from Notification service reminder completed. event: task-reminder-status

    * Notification service 
        * 1- receive message: new notification reminder
        * 2- send push notification to client (reminder arrived: user do something). event: task-reminder-ontime
        * 3- receive notification back from client: user read the notification. event: task-reminder-read
        * 4- send message to task the reminder was completed (change the status ?? for one time notif)

    * Client
        * receive push notification
        * mark notification as read

- Quick deliver compromise
    * Auth: Leftover(refresh token)
    * Gate: to Test(Ip rate limiting, server timeout), Leftover(token caching,http Error middleware 404,500,other)
    * Task: to add(other bread method in task router), Leftover(comprehensive fulltext index on title and full body)


- Message channel organisation
    * Task - Notif {channel: task-reminder, events:["new-reminder","update-status"]}
    * Notif - Client: {channel: reminder-ontime, events:["reminder-arrived","reminder-read"]}