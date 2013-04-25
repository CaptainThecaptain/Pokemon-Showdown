/*

Ratings and how they work:

-2: Extremely detrimental
	  The sort of ability that relegates Pokemon with Uber-level BSTs
	  into NU.
	ex. Slow Start, Truant

-1: Detrimental
	  An ability that does more harm than good.
	ex. Defeatist, Klutz

 0: Useless
	  An ability with no net effect on a Pokemon during a battle.
	ex. Pickup, Illuminate

 1: Ineffective
	  An ability that has a minimal effect. Should never be chosen over
	  any other ability.
	ex. Pressure, Damp

 2: Situationally useful
	  An ability that can be useful in certain situations.
	ex. Blaze, Insomnia

 3: Useful
	  An ability that is generally useful.
	ex. Volt Absorb, Iron Fist

 4: Very useful
	  One of the most popular abilities. The difference between 3 and 4
	  can be ambiguous.
	ex. Technician, Intimidate

 5: Essential
	  The sort of ability that defines metagames.
	ex. Drizzle, Magnet Pull

*/

exports.BattleAbilities = {
		"contamination": {
			desc: "When this Pokemon enters the battlefield, it causes a permanent Toxic Rain that can only be stopped by Air Lock, Cloud Nine or another weather condition.",
			shortDesc: "On switch-in, this Pokemon summons Toxic Rain until another weather replaces it.",
			onStart: function(source) {
				this.setWeather('toxicrain');
				this.weatherData.duration = 0;
			},
			id: "contamination",
			name: "Contamination",
			rating: 5,
			num: -100
		},
		poisonheal: {
			inherit: true,
			onImmunity: function(type, pokemon) {
				if (type === 'toxicrain') return false;
			},
		},
		"airlock": {
		desc: "While this Pokemon is active, all weather conditions and their effects are disabled.",
		shortDesc: "While this Pokemon is active, all weather conditions and their effects are disabled.",
		onStart: function(pokemon) {
			this.add('-message', 'The effects of weather disappeared. (placeholder)');
			this.setWeather('none');
			this.weatherData.duration = 0;
			this.add('The weather was erased by Air Lock!')
		},
		onAnyModifyPokemon: function(pokemon) {
			pokemon.ignore['WeatherTarget'] = true;
		},
		onAnyTryWeather: false,
		id: "airlock",
		name: "Air Lock",
		rating: 3,
		num: 76
		},
		"chlorophyll": {
		desc: "If this Pokemon is active while Sunny Day is in effect, its speed is temporarily doubled.",
		shortDesc: "If Sunny Day is active, this Pokemon's Speed is doubled.",
		onModifySpe: function(spe) {
			if (this.isWeather('sunnyday')) {
				return spe * 1.15;
			}
		},
		id: "chlorophyll",
		name: "Chlorophyll",
		rating: 2,
		num: 34
	},
	"swiftswim": {
		desc: "If this Pokemon is active while Rain Dance is in effect, its speed is temporarily doubled.",
		shortDesc: "If Rain Dance is active, this Pokemon's Speed is doubled.",
		onModifySpe: function(spe, pokemon) {
			if (this.isWeather('raindance')) {
				return spe * 1.5;
			}
		},
		id: "swiftswim",
		name: "Swift Swim",
		rating: 2,
		num: 33
	},
	"sandrush": {
		desc: "Doubles Speed in a Sandstorm, and makes the Pokemon immune to Sandstorm damage.",
		shortDesc: "If Sandstorm is active, this Pokemon's Speed is doubled; immunity to Sandstorm.",
		onModifySpe: function(spe, pokemon) {
			if (this.isWeather('sandstorm')) {
				return spe * 1.15;
			}
		},
		onImmunity: function(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		id: "sandrush",
		name: "Sand Rush",
		rating: 2,
		num: 146
	},
		"trickster" : {
			desc: "When this Pokemon enters the battlefield, it causes a permanent Trick Room that can only be stopped by Air Lock, Cloud Nine or another weather condition.",
			shortDesc: "On switch-in, this Pokemon summons Toxic Rain until another weather replaces it.",
			onStart: function(pokemon) {
				this.debug("Starting Trickster Trick Room");
				if (this.pseudoWeather['trickroom']) {
					this.removePseudoWeather('trickroom', pokemon, pokemon);
				}
				this.addPseudoWeather('trickroom', pokemon, pokemon);
				this.pseudoWeather['trickroom'].duration = 5;
			},
			id: "trickster",
			name: "Trickster",
			rating: 5,
			num: -101
		}
};