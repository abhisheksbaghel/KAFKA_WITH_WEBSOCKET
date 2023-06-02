package com.Chat.Websocket.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {

    private String name;
    private String content;
    private String msg_time;

    @Override
    public String toString() {
        return "Message{" +
                "sender='" + name + '\'' +
                ", content='" + content + '\'' +
                ", timestamp='" + msg_time + '\'' +
                '}';
    }

}
