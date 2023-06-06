package com.Chat.Websocket.Consumer;

import com.Chat.Websocket.Constants.KafkaConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class MessageListener {
    @Autowired
    SimpMessagingTemplate template;

    @KafkaListener(
            topics = KafkaConstants.KAFKA_TOPIC,
            groupId = KafkaConstants.GROUP_ID
    )
    public void listen(Message message) {

//        message.toString();
        System.out.println("___________________----------------"+message.getPayload());
        System.out.println("sending via kafka listener..");
        template.convertAndSend("/topic/return-to", message.getPayload());
    }
}
