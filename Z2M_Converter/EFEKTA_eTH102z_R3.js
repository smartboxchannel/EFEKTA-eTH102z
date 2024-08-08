const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const constants = require('zigbee-herdsman-converters/lib/constants');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
//const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;


const tzLocal = {
	node_config: {
        key: ['reading_delay'],
        convertSet: async (entity, key, rawValue, meta) => {
            const lookup = {'OFF': 0x00, 'ON': 0x01};
            const value = lookup.hasOwnProperty(rawValue) ? lookup[rawValue] : parseInt(rawValue, 10);
            const payloads = {
                reading_delay: ['genPowerCfg', {0x0201: {value, type: 0x21}}],
            };
            await entity.write(payloads[key][0], payloads[key][1]);
            return {
                state: {[key]: rawValue},
            };
        },
    },
	config_disp: {
        key: ['invert'],
        convertSet: async (entity, key, rawValue, meta) => {
            const lookup = {'OFF': 0x00, 'ON': 0x01};
            const value = lookup.hasOwnProperty(rawValue) ? lookup[rawValue] : parseInt(rawValue, 10);
            const payloads = {
				invert: ['genPowerCfg', {0x0210: {value, type: 0x10}}],
            };
            await entity.write(payloads[key][0], payloads[key][1]);
            return {
                state: {[key]: rawValue},
            };
        },
    },
	termostat_config: {
        key: ['high_temp', 'low_temp', 'enable_temp', 'invert_logic_temp'],
        convertSet: async (entity, key, rawValue, meta) => {
            const lookup = {'OFF': 0x00, 'ON': 0x01};
            const value = lookup.hasOwnProperty(rawValue) ? lookup[rawValue] : parseInt(rawValue, 10);
            const payloads = {
				enable_temp: ['msTemperatureMeasurement', {0x0220: {value, type: 0x10}}],
                high_temp: ['msTemperatureMeasurement', {0x0221: {value, type: 0x29}}],
                low_temp: ['msTemperatureMeasurement', {0x0222: {value, type: 0x29}}],
				invert_logic_temp: ['msTemperatureMeasurement', {0x0225: {value, type: 0x10}}],
            };
            await entity.write(payloads[key][0], payloads[key][1]);
            return {
                state: {[key]: rawValue},
            };
        },
    },
	hydrostat_config: {
        key: ['high_hum', 'low_hum', 'enable_hum', 'invert_logic_hum'],
        convertSet: async (entity, key, rawValue, meta) => {
            const lookup = {'OFF': 0x00, 'ON': 0x01};
            const value = lookup.hasOwnProperty(rawValue) ? lookup[rawValue] : parseInt(rawValue, 10);
            const payloads = {
				enable_hum: ['msRelativeHumidity', {0x0220: {value, type: 0x10}}],
                high_hum: ['msRelativeHumidity', {0x0221: {value, type: 0x29}}],
                low_hum: ['msRelativeHumidity', {0x0222: {value, type: 0x29}}],
				invert_logic_hum: ['msRelativeHumidity', {0x0225: {value, type: 0x10}}],
            };
            await entity.write(payloads[key][0], payloads[key][1]);
            return {
                state: {[key]: rawValue},
            };
        },
    },
};

const fzLocal = {
	node_config: {
        cluster: 'genPowerCfg',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.hasOwnProperty(0x0201)) {
                result.reading_delay = msg.data[0x0201];
            }
            return result;
        },
    },
	config_disp: {
        cluster: 'genPowerCfg',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.hasOwnProperty(0x0210)) {
                result.invert = msg.data[0x0210];
            }
            return result;
        },
    },
	termostat_config: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.hasOwnProperty(0x0221)) {
                result.high_temp = msg.data[0x0221];
            }
			if (msg.data.hasOwnProperty(0x0222)) {
                result.low_temp = msg.data[0x0222];
            }
            if (msg.data.hasOwnProperty(0x0220)) {
                result.enable_temp = ['OFF', 'ON'][msg.data[0x0220]];
            }
			if (msg.data.hasOwnProperty(0x0225)) {
                result.invert_logic_temp = ['OFF', 'ON'][msg.data[0x0225]];
            }
            return result;
        },
    },
	hydrostat_config: {
        cluster: 'msRelativeHumidity',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            const result = {};
            if (msg.data.hasOwnProperty(0x0221)) {
                result.high_hum = msg.data[0x0221];
            }
			if (msg.data.hasOwnProperty(0x0222)) {
                result.low_hum = msg.data[0x0222];
            }
            if (msg.data.hasOwnProperty(0x0220)) {
                result.enable_hum = ['OFF', 'ON'][msg.data[0x0220]];
            }
			if (msg.data.hasOwnProperty(0x0225)) {
                result.invert_logic_hum = ['OFF', 'ON'][msg.data[0x0225]];
            }
            return result;
        },
    },
	local_time: {
        cluster: 'genTime',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            return {local_time: msg.data.localTime};
        },
    },
};

const definition = {
        zigbeeModel: ['EFEKTA_eTH102z'],
        model: 'EFEKTA_eTH102z',
        vendor: 'EfektaLab',
        description: '[Temperature and humidity sensor with e-ink1.02, date, termostat, gidrostat, invert display](http://efektalab.com/eON102z)',
        fromZigbee: [fz.temperature, fz.humidity, fz.battery, fzLocal.termostat_config, fzLocal.hydrostat_config, fzLocal.config_disp, fzLocal.node_config],
        toZigbee: [tz.factory_reset, tzLocal.termostat_config, tzLocal.hydrostat_config, tzLocal.config_disp, tzLocal.node_config],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, [
                'genPowerCfg', 'msTemperatureMeasurement', 'msRelativeHumidity']);
		    const overrides = {min: 0, max: 1800, change: 10};
			const overrides1 = {min: 0, max: 21600, change: 1};
            await reporting.temperature(endpoint, overrides);
			await reporting.humidity(endpoint, overrides);
			await reporting.batteryVoltage(endpoint, overrides1);
            await reporting.batteryPercentageRemaining(endpoint, overrides1);
			await reporting.batteryAlarmState(endpoint, overrides1);
        },
        exposes: [e.temperature(), e.humidity(), e.battery_low(), e.battery(), e.battery_voltage(), 
		    exposes.numeric('reading_delay', ea.STATE_SET).withUnit('Seconds').withDescription('Adjust Report Delay. Setting the time in seconds, by default 30 seconds')
                .withValueMin(15).withValueMax(3600),
		    exposes.enum('invert', ea.STATE_SET, [0, 1]).withDescription('Invert display color'),
		    exposes.binary('enable_temp', ea.STATE_SET, 'ON', 'OFF').withDescription('Enable Temperature Control'),
            exposes.numeric('high_temp', ea.STATE_SET).withUnit('C').withDescription('Setting High Temperature Border')
                .withValueMin(-5).withValueMax(50),
            exposes.numeric('low_temp', ea.STATE_SET).withUnit('C').withDescription('Setting Low Temperature Border')
                .withValueMin(-5).withValueMax(50),
		    exposes.binary('enable_hum', ea.STATE_SET, 'ON', 'OFF').withDescription('Enable Humidity Control'),
            exposes.numeric('high_hum', ea.STATE_SET).withUnit('C').withDescription('Setting High Humidity Border')
                .withValueMin(0).withValueMax(99),
            exposes.numeric('low_hum', ea.STATE_SET).withUnit('C').withDescription('Setting Low Humidity Border')
                .withValueMin(0).withValueMax(99)],
};

module.exports = definition;