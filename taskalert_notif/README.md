- Functionning (one-time alert)
    * Task service save the task and related alert if existing
    * if existing the related alert through populate and send it to Notification service
    * Notification service create a cron job waiting for the alert
        * on time: send push notification to in app and phone
        * on notification read: send message to task and mark the status of the alert(redd)

- Notes:
    * cron job created for single element and delete for each one is it good like that ?
    * alternative: the cron job execute each day access db and retrieve all unread still active alert
    * settimeout or setinterval to execute a operation a particular time and then delete it
    * the publisher - subscriber is between notification - client
    * the job may execute before a new alert get created, that's why task-notification communication
    * service-to-service auth with jwt in request header