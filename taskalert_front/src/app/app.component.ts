import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RestService } from './services/rest.service';
import pusherJs from 'pusher-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'taskalert_front';
  server_status:string = "";
  pusher: any;
  messageChannel:any;
  messages: any[] = [];

  constructor(private rest:RestService){
    this.pusher = new pusherJs("40480d6b85d36162c10c",{
      cluster: "mt1",
      authEndpoint: 'http://localhost:8002/pusher/auth',
    });
    this.messageChannel = this.pusher.subscribe('reminder-ontime');
    
  }
  ngOnInit(){
    console.log(this.messageChannel);
    this.messageChannel.bind("reminder-arrived",(service_msg:any) => {
      console.log("service sent:"+service_msg);
      this.messages.push(service_msg);
      console.log(this.messages);
      setTimeout(()=>{
        this.notifyReminderRead(this.messageChannel)
      }, 5000 );
    });
  }

  notifyReminderRead(channel:any){
    console.log("client resonse");
    // this.messageChannel.trigger('reminder-read',{message: "the reminder was read"});
    
    channel.trigger('client-reminder-read',{message: "the reminder was read"});
  }
}
