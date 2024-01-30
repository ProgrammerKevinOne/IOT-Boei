#include <OneWire.h>
#include <DallasTemperature.h>

// Connect your yellow pin to Pin12 on Arduino
#define ONE_WIRE_BUS 5

float buffer_arr2[10];
float t, avg;

  // Setup a oneWire instance to communicate with any OneWire devices
  OneWire oneWire(ONE_WIRE_BUS);

// Pass our oneWire reference to Dallas Temperature sensor
DallasTemperature sensors(&oneWire);

void initializeTemperatureSensor() {
  // initialize the Serial Monitor at a baud rate of 9600.
  sensors.begin();
}

float measureTemperature() {
  // Call sensors.requestTemperatures() to issue a global temperature and Requests to all devices on the bus
  for (int i = 0; i < 10; i++) {  // Meet 10 keer
    sensors.requestTemperatures();
    buffer_arr2[i] = sensors.getTempCByIndex(0);
    delay(30);
  }

  for (int i = 0; i < 9; i++) {  // Zet de waardes op volgorde
    for (int j = i + 1; j < 10; j++) {
      if (buffer_arr2[i] > buffer_arr2[j]) {
        t = buffer_arr2[i];
        buffer_arr2[i] = buffer_arr2[j];
        buffer_arr2[j] = t;
      }
    }
  }

  avg = 0;
  for (int i = 2; i < 8; i++){
    avg += buffer_arr2[i];  //Pak de mediaan van de waardes
  }
  float temperatuur = avg/6;

  Serial.print("Celsius temperature: ");
  Serial.println(temperatuur);
  return temperatuur;
}
