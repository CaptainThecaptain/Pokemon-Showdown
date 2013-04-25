function clampIntRange(num, min, max) {
	num = Math.floor(num);
	if (num < min) num = min;
	if (typeof max !== 'undefined' && num > max) num = max;
	return num;
}
exports.BattleStatuses = {
		
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
				return basePower * 1.15;
		}
			if (move.type === 'Water') {
				this.debug('Water fire boost');
				return basePower / 2;
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
		onModifySpA: function(spa, pokemon) {
			if (pokemon.hasType('Rock')) {
				return spa * 3/2;
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
