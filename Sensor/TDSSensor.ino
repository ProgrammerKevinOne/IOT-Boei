/***************************************************
 DFRobot Gravity: Analog TDS Sensor / Meter For Arduino
 <https://www.dfrobot.com/wiki/index.php/Gravity:_Analog_TDS_Sensor_/_Meter_For_Arduino_SKU:_SEN0244>

 Created 2017-8-22
 By Jason <jason.ling@dfrobot.com@dfrobot.com>

 GNU Lesser General Public License.
 See <http://www.gnu.org/licenses/> for details.
 All above must be included in any redistribution

 /***********Notice and Trouble shooting***************
 1. This code is tested on Arduino Uno and Leonardo with Arduino IDE 1.0.5 r2 and 1.8.2.
 2. More details, please click this link: <https://www.dfrobot.com/wiki/index.php/Gravity:_Analog_TDS_Sensor_/_Meter_For_Arduino_SKU:_SEN0244>
 ****************************************************/

#define TdsSensorPin A0
#define VREF 5.0           // analog reference voltage(Volt) of the ADC
#define SCOUNT 30          // sum of sample point
int analogBuffer[SCOUNT];  // store the analog value in the array, read from ADC
int analogBufferTemp[SCOUNT];
int analogBufferIndex = 0, copyIndex = 0;
float averageVoltage = 0, tdsValue = 0, temperature = 25;

void initializeTDSSensor() {
  pinMode(TdsSensorPin, INPUT);
}

int getMedianNum(int bArray[], int iFilterLen) {
  int bTab[iFilterLen];
  for (byte i = 0; i < iFilterLen; i++)
    bTab[i] = bArray[i];
  int i, j, bTemp;
  for (j = 0; j < iFilterLen - 1; j++) {
    for (i = 0; i < iFilterLen - j - 1; i++) {
      if (bTab[i] > bTab[i + 1]) {
        bTemp = bTab[i];
        bTab[i] = bTab[i + 1];
        bTab[i + 1] = bTemp;
      }
    }
  }
  if ((iFilterLen & 1) > 0)
    bTemp = bTab[(iFilterLen - 1) / 2];
  else
    bTemp = (bTab[iFilterLen / 2] + bTab[iFilterLen / 2 - 1]) / 2;
  return bTemp;
}

float measureTDS() {

  static unsigned long analogSampleTimepoint = millis();
  for (int i = 0; i < SCOUNT; i++) {
    delay(40);
    analogBuffer[i] = analogRead(TdsSensorPin);  //fill analogBuffer with 30 measurement values. there is 40 ms between every measurement.
  }




  averageVoltage = getMedianNum(analogBuffer, SCOUNT) * (float)VREF / 1024.0;                                                                                                       // read the analog value more stable by the median filtering algorithm, and convert to voltage value
  float compensationCoefficient = 1.0 + 0.02 * (temperature - 25.0);                                                                                                                //temperature compensation formula: fFinalResult(25^C) = fFinalResult(current)/(1.0+0.02*(fTP-25.0));
  float compensationVoltage = averageVoltage / compensationCoefficient;                                                                                                             //temperature compensation
  tdsValue = (133.42 * compensationVoltage * compensationVoltage * compensationVoltage - 255.86 * compensationVoltage * compensationVoltage + 857.39 * compensationVoltage) * 0.5;  //convert voltage value to tds value

  Serial.print("TDS Value: ");
  Serial.print(tdsValue, 1);
  Serial.println(" ppm");

  return tdsValue;
}