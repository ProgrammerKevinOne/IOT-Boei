#include <OneWire.h>
#include <DallasTemperature.h>
 
// Connect your yellow pin to Pin12 on Arduino
#define ONE_WIRE_BUS 5
 
// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(ONE_WIRE_BUS);
 
// Pass our oneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);
 
void initializeTemperatureSensor()
{
  // initialize the Serial Monitor at a baud rate of 9600.
  
  sensors.begin();
}
 
void measureTemperature(){ 
  // Call sensors.requestTemperatures() to issue a global temperature and Requests to all devices on the bus
  sensors.requestTemperatures(); 
  delay(2000);
  Serial.print("Celsius temperature: ");
  Serial.println(sensors.getTempCByIndex(0)); 
  //Serial.print(" - Fahrenheit temperature: ");
  //Serial.println(sensors.getTempFByIndex(0));
  
}
