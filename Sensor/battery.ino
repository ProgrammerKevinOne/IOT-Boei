const int batteryPin = A5;      // Analog pin connected to the battery voltage divider
const float MAX_VOLTAGE = 9.0;  // Maximum voltage of your battery when fully charged


int measureBattery() {
  int sensorValue = analogRead(batteryPin);      // Read the analog value from the voltage divider
  float voltage = sensorValue * (5.0 / 1023.0);  // Convert analog value to voltage
  int batteryPercentage;

  // Convert voltage to percentage
  if ((voltage * 2) >= 9) {
    batteryPercentage = 100;
  } else if ((voltage * 2) < 9 && (voltage * 2) > 7) {
    batteryPercentage = ((voltage * 2) - MAX_VOLTAGE + 2 / 2) * 100;
  } else if ((voltage * 2) <= 7) {
    batteryPercentage = 0;
  }

  Serial.print("Battery Percentage: ");
  Serial.print(batteryPercentage);
  Serial.println("%");

  //delay(1000); // Delay for better readability in the serial monitor
  return batteryPercentage;
}