function clampIntRange(num, min, max) {
	num = Math.floor(num);
	if (num < min) num = min;
	if (typeof max !== 'undefined' && num > max) num = max;
	return num;
}
exports.BattleStatuses = {
	brn: {
		effectType: 'Status',
		onStart: function(target) {
			this.add('-status', target, 'brn');
		},
		onBasePower: function(basePower, attacker, defender, move) {
			if (move && move.category === 'Physical' && attacker && attacker.ability !== 'guts') {
				return basePower / 2;
			}
			if (move && move.category === 'Special' && attacker && attacker.ability !== 'guts') {
				return basePower * 3/4;
			}
		},
		onResidualOrder: 9,
		onResidual: function(pokemon) {
			this.damage(pokemon.maxhp/8 + 30);
		}
	},	
	sunnyday: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'heatrock') {
				return 8;
			}
			return 5;
		},
		onBasePower: function(basePower, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return basePower * 1.5;
			}
			if (move.type === 'Water') {
				this.debug('Sunny Day water suppress');
				return basePower * .5;
			}
			if (move.type === 'Flying') {
				this.debug('flying water suppress');
				return basePower * .5;
			}
			if (move.type === 'Ground') {
				this.debug('Ground suppress');
				return basePower * .5;
			}
		},
		onModifyDef: function(def, pokemon) {
			if (pokemon.hasType('Fire')) {
				return def * 3/2;
			}
			},
			onModifySpD: function(spd, pokemon) {
			if (pokemon.hasType('Poison')) {
				return spd * 3/2;
			}
			},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'SunnyDay', '[from] ability: '+effect, '[of] '+source);
			} else {
				this.add('-weather', 'SunnyDay');
			}
		},
		onImmunity: function(type) {
			if (type === 'frz') return false;
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'SunnyDay', '[upkeep]');
			this.eachEvent('Weather');
		},
		onEnd: function() {
			this.add('-weather', 'none');
		}
	},
	sandstorm: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'smoothrock') {
				return 18;
			}
			return 12;
		},
		onModifySpD: function(spd, pokemon) {
			if (pokemon.hasType('Rock')) {
				return spd * 3/2;
			}
			},
			onModifyDef: function(def, pokemon) {
			if (pokemon.hasType('Steel')) {
				return def * 3/2;
			}
			},
			onModifySpe: function(spe, pokemon) {
			if (pokemon.hasType('Ground')) {
				return spe * 5/4;
			}
		},
		onBasePower: function(basePower, attacker, defender, move) {
			if (move.type === 'Steel') {
				this.debug('Steel boost');
				return basePower * 1.3;
			}
			},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'Sandstorm', '[from] ability: '+effect, '[of] '+source);
			} else {
				this.add('-weather', 'Sandstorm');
			}
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'Sandstorm', '[upkeep]');
			this.eachEvent('Weather');
		},
		onWeather: function(target) {
			this.damage(target.maxhp/16);
		},
		onEnd: function() {
			this.add('-weather', 'none');
		}
	},
	hail: {
		effectType: 'Weather',
		duration: 5,
		durationCallback: function(source, effect) {
			if (source && source.item === 'icyrock') {
				return 18;
			}
			return 12;
		},
		onModifyDef: function(def, pokemon) {
			if (pokemon.hasType('Ice')) {
				return def * 3/2;
			}
			},
			onModifyAtk: function(atk, pokemon) {
			if (pokemon.hasType('Poison')) {
				return atk * 5/4;
			}
		},
		onBasePower: function(basePower, attacker, defender, move) {
			if (move.type === 'Poison') {
				this.debug('Poison boost');
				return basePower * 1.5;
			}
			if (move.type === 'Ice') {
				this.debug('Ice boost');
				return basePower * 1.3;
			}
			if (move.type === 'Fighting') {
				this.debug('Fighting was weakened');
				return basePower / 1.5;
				}
			},
		onStart: function(battle, source, effect) {
			if (effect && effect.effectType === 'Ability') {
				this.effectData.duration = 0;
				this.add('-weather', 'Hail', '[from] ability: '+effect, '[of] '+source);
			} else {
				this.add('-weather', 'Hail');
			}
		},
		onResidualOrder: 1,
		onResidual: function() {
			this.add('-weather', 'Hail', '[upkeep]');
			this.eachEvent('Weather');
		},
		onWeather: function(target) {
			this.damage(target.maxhp/16);
		},
		onEnd: function() {
			this.add('-weather', 'none');
		}
	},
		toxicrain: {
			effectType: 'Weather',
			duration: 5,
			durationCallback: function(source, effect) {
				if (source && source.item === 'damprock') {
					return 8;
				}
				return 5;
			},
			onModifyDef: function(def, pokemon) {
				if (!pokemon.hasType('Poison') && !pokemon.hasType('Steel') && !pokemon.hasType('Bug') && pokemon.ability !== 'poisonheal' && pokemon.ability !== 'toxicbody') {
					this.debug('toxic water lowers def');
					return def * 0.75;
				}
			},
			onModifySpD: function(spd, pokemon) {
				if (!pokemon.hasType('Poison') && !pokemon.hasType('Steel') && !pokemon.hasType('Bug') && pokemon.ability !== 'poisonheal' && pokemon.ability !== 'toxicbody') {
					this.debug('toxic water lowers spd');
					return spd * 0.75;
				}
			},
			onStart: function(battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.effectData.duration = 0;
					this.add('-weather', 'ToxicRain', '[from] ability: '+effect, '[of] '+source);
				} else {
					this.add('-weather', 'ToxicRain');
				}
			},
			onModifyMove: function(move) {
				this.debug('Toxic Rain increases Poison-type accuracy');
				if (typeof move.accuracy !== 'number') return;
				if (move.type === 'Poison') move.accuracy = 100;
			},
			onResidualOrder: 1,
			onResidual: function() {
				this.add('-weather', 'ToxicRain', '[upkeep]');
				this.eachEvent('Weather');
			},
			onWeather: function(target) {
				this.damage(target.maxhp/16);
			},
			onEnd: function() {
				this.add('-weather', 'none');
			}
		}
};
