/*
Connect to Ethernet Using DHCP
Author:- Embedded Laboratory
*/

#include <SPI.h>
#include <Ethernet.h>

#define ETH_CS    10
#define SD_CS  4

// Enter a MAC address for your controller below.
// Newer Ethernet shields have a MAC address printed on a sticker on the shield
byte mac[] = {0xB0,0xCD,0xAE,0x0F,0xDE,0x10};

IPAddress ip(192,168,1,168);

IPAddress server(192,168,1,66); 

EthernetClient client;
int count;

void setup()
{
  Serial.begin(9600);
  Serial.println("Starting Ethernet Connection");
  pinMode(ETH_CS,OUTPUT);
  pinMode(SD_CS,OUTPUT);
  digitalWrite(ETH_CS,LOW); // Select the Ethernet Module.
  digitalWrite(SD_CS,HIGH); // De-Select the internal SD Card
}

void loop()
{
  
  // if the server's disconnected, restart loop
  if (!client.connected()) 
  {
    if (Ethernet.begin(mac) == 0)  // Start in DHCP Mode
    {
        Serial.println("Failed to configure Ethernet using DHCP, using Static Mode");
        // If DHCP Mode failed, start in Static Mode
        Ethernet.begin(mac, ip);
    }
  
    //Serial.print("My IP address: ");
  
    //for (byte thisByte = 0; thisByte < 4; thisByte++)
    //{
    //    // print the value of each byte of the IP address:
    //    Serial.print(Ethernet.localIP()[thisByte], DEC);
    //    Serial.print("."); 
    //}
    //Serial.println();
    // give the Ethernet shield a second to initialize:
    delay(1000);
    Serial.println("connecting...");

    // if you get a connection, report back via serial:
    if (client.connect(server, 5000))
    {
        Serial.println("connected to server");
    } 
    else
    {
         Serial.println("Connection to server failed");
    }
  }
  else
  {
    char mes[] = "location = sauna, temperature = 100, time ";
    char message[50];
    sprintf(message, "%s = %d", mes, count); 
    count++;
    
    char len = sizeof(message)-1;
    //Serial.print(len);
    client.write(message, len);
    Serial.println("disconnected.");
    client.stop();
    delay(4000);
  }
}
