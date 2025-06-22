import { useCallback } from 'react';

export const useKafkaProducer = () => {
  const sendEvent = useCallback(async (topic: string, event: any) => {
    try {
      // Send to backend Kafka producer
      const response = await fetch('http://localhost:8080/api/kafka/produce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          event
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to send event to topic ${topic}`);
      }

      const result = await response.json();
      console.log(`✅ Event sent to Kafka topic "${topic}" for parallel processing:`, event);
      console.log(`📊 Processing status:`, result);
      return true;
    } catch (error) {
      console.error('❌ Failed to send Kafka event:', error);
      
      // For demo purposes, we'll just log the event
      console.log(`🔄 [DEMO MODE] Event for topic "${topic}":`, event);
      return false;
    }
  }, []);

  return { sendEvent };
};