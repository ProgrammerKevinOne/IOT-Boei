float calibration_value = 30.4;
int phval = 0;
unsigned long int avgval;
int buffer_arr[10], temp;

void initializePHSensor() {
  pinMode(A1, INPUT);
}

float measurePH() {
  for (int i = 0; i < 10; i++) {  // Meet 10 keer
    buffer_arr[i] = analogRead(A1);
    delay(30);
  }

  for (int i = 0; i < 9; i++) {  // Zet de pH waardes in volgorde
    for (int j = i + 1; j < 10; j++) {
      if (buffer_arr[i] > buffer_arr[j]) {
        temp = buffer_arr[i];
        buffer_arr[i] = buffer_arr[j];
        buffer_arr[j] = temp;
      }
    }
  }

  avgval = 0;
  for (int i = 2; i < 8; i++)
    avgval += buffer_arr[i];  //Pak gemiddelde van de pH waardes
  float volt = (float)avgval * 5.0 / 1024 / 6;
  float ph_act = -5.70 * volt + calibration_value;

  Serial.print("pH waarde: ");
  Serial.println(ph_act);
  return ph_act;
}