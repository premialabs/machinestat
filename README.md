### Solution description

```
if (`reading` is greater than 30) {
    Send SMS {`to`: '+94719319791', `message`: 'Device "Room Temperature [7283]" is greater than 30'};
}

if (`reading` is between 20 and 50) {
    Send Email {`to`: 'lakmalp@gmail.com', `subject`: 'Room Temperature [7283] Alert', `body`: 'Device "Room Temperature [7283]" is between 20 and 50'};
}

if (`reading` is 1) {
    Send SMS {`to`: '+94719319791', `message`: 'Device "Living Area Window A [6234]" is Open'};
}

if (`reading`is greater than 40 and repeates for 5 times) {
    Send Email {`to`: 'lakmalp@gmail.com', `subject`: 'Room Temperature [7283] Alert', `body`: 'Device "Room Temperature [7283]" is greater than 40, 5 times consecutively'};
}
```

### Binary:
```
{
    device_id: '28376', 
    device_name: 'Living Area - Door Lock'
    condition: 'is', 
    condition_parameters: ['1'], 
    actions: [
        {type: 'SMS', to: '+94719319791', message: 'Living Area - Door Lock [28376] is Open'}, 
        {type: 'Email', to: 'lakmalp@gmail.com', subject: 'Living Area - Door Lock Alert', body: 'Living Area - Door Lock [28376] is Open'}
    ]
}
```

### Numeric:
```
{
    device_id: '5978', 
    device_name: 'Kitchen - LPG Sensor'
    condition: 'greater than', 
    condition_parameters: ['26'], 
    actions: [
        {type: 'SMS', to: '+94719319791', message: 'Kitchen - LPG Sensor [5978] is above 26'}, 
        {type: 'Email', to: 'lakmalp@gmail.com', subject: 'Kitchen - LPG Sensor Alert', body: 'Kitchen - LPG Sensor [5978] is above 26'}
    ]
}
```

### Numeric:
```
{
    device_id: '64955', 
    device_name: 'Mains Voltage'
    condition: 'in between', 
    condition_parameters: ['230', '240'], 
    actions: [
        {type: 'SMS', to: '+94719319791', message: 'Mains Voltage [64955] is in between 230 and 240'}, 
        {type: 'SMS', to: '+94714694096', message: 'Mains Voltage [64955] is in between 230 and 240'}, 
        {type: 'Email', to: 'lakmalp@gmail.com', subject: 'Mains Voltage Alert', body: 'Mains Voltage [64955] is in between 230 and 240'}
    ]
}
```
```
devices {id, device_id, name}
1, 28376, 'Living Area - Door Lock'
2, 5978, 'Kitchen - LPG Sensor'
3, 64955, 'Mains Voltage'

conditions {id, name}
1, 'is'
2, 'greater than'
3, 'in between'

events {id, device_id, condition_id, condition_param_1, condition_param_2, condition_param_3}
1, 1, 1, '1', null, null
2, 2, 2, '26', null, null
3, 3, 3, '230', '240', null

event_actions {id, event_id, action_line_no, type, payload}
1, 1, 1, 'SMS', {to: '+94719319791', message: 'Living Area - Door Lock [28376] is Open'}
2, 1, 2, 'Email', {to: 'lakmalp@gmail.com', subject: 'Living Area - Door Lock Alert', body: 'Living Area - Door Lock [28376] is Open'}
3, 2, 1, 'SMS', {to: '+94719319791', message: 'Kitchen - LPG Sensor [5978] is above 26'}
4, 2, 2, 'Email', {to: 'lakmalp@gmail.com', subject: 'Kitchen - LPG Sensor Alert', body: 'Kitchen - LPG Sensor [5978] is above 26'}
5, 3, 1, 'SMS', {to: '+94719319791', message: 'Mains Voltage [64955] is in between 230 and 240'}
5, 3, 2, 'SMS', {to: '+94714694096', message: 'Mains Voltage [64955] is in between 230 and 240'}
5, 3, 3, 'SMS', {to: 'lakmalp@gmail.com', subject: 'Mains Voltage Alert', body: 'Mains Voltage [64955] is in between 230 and 240'}
```