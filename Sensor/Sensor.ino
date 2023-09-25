
void setup(){

  Serial.begin(9600);
  initializeTDSSensor();
  initializeTemperatureSensor();
  initializePHSensor();
}

void loop()
{
   measureTDS();
   measureTemperature();
   measurePH();
   Serial.println(" ");
   delay(2000);
}