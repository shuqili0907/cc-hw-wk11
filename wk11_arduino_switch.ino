const int LEDPin = 2; 
const int switchPin = 3; 
int switchVal; 

void setup() {
  // put your setup code here, to run once:
  pinMode(LEDPin, OUTPUT); 
  pinMode(switchPin, INPUT); 
  Serial.begin(9600); 
}

void loop() {
  // put your main code here, to run repeatedly:
switchVal = digitalRead(switchPin); 
if(switchVal == HIGH){ 
  digitalWrite(LEDPin, LOW); 
  Serial.println("button pressed");
} else{ 
  digitalWrite(LEDPin, HIGH); 
}

}

