package station.chargeStation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

@SpringBootApplication
@EnableWebSocketMessageBroker
public class ChargeStationApplication implements WebSocketMessageBrokerConfigurer {

    public static void main(String[] args) {
        SpringApplication.run(ChargeStationApplication.class, args);
    }
    
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
    	System.out.println("WebSocket opening");
        registry.addEndpoint("/websocket").setAllowedOrigins("*").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
    	System.out.println("Configure starting");
        registry.setApplicationDestinationPrefixes("/app");
        registry.enableSimpleBroker("/topic");
    }

    @Bean
    public ServletServerContainerFactoryBean createWebSocketContainer() {
    	System.out.println("Server Container starting");
        ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
        container.setMaxTextMessageBufferSize(8192);
        container.setMaxBinaryMessageBufferSize(8192);
        return container;
    }
}
