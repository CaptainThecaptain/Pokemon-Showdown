exports.BattleItems = {
"blacksludge": {
		id: "blacksludge",
		name: "Black Sludge",
		spritenum: 34,
		fling: {
			basePower: 30
		},
		onResidualOrder: 40,
		onResidualSubOrder: 2,
		onResidual: function(pokemon) {
			if (pokemon.hasType('Poison')) {
				this.heal(pokemon.getStat('spe')/16 + 35);
			} else {
				this.damage(pokemon.maxhp/8);
			}
			
		},
		desc: "Each turn, if holder is a Poison-type, restores 1/16 max HP; loses 1/8 if not."
	},
	"leftovers": {
		id: "leftovers",
		name: "Leftovers",
		spritenum: 242,
		fling: {
			basePower: 10
		},
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual: function(pokemon) {
			this.heal((pokemon.getStat('def') + pokemon.getStat('spd'))/32 - (pokemon.getStat('atk') + pokemon.getStat('spa'))/8 + (pokemon.getStat('def') + pokemon.getStat('spd'))/10);
			this.heal(math.abs(pokemon.getmaxhp/16 + 15 - (pokemon.getStat('atk') + pokemon.getStat('spa'))/64))
			},
		onBasePower: function(basePower, user) {
		return basePower / 1.3;
},
		onModifyDef: function(def, pokemon) {	
				return def + (pokemon.maxhp/3 - (pokemon.getStat('atk')+ pokemon.getStat('spa'))/4);
			
		},
		onModifySpD: function(spd, pokemon) {
				return spd + (pokemon.maxhp/3 - (pokemon.getStat('atk')+ pokemon.getStat('spa'))/4);
		},
		desc: "At the end of every turn, holder restores 1/16 of its max HP."
	},
		"griseousorb": {
			id: "griseousorb",
			name: "Griseous Orb",
			spritenum: 180,
			fling: {
				basePower: 60
			},
			onBasePower: function(basePower, user, target, move) {
				if (user.template.num === 487 && (move.type === 'Ghost' || move.type === 'Dragon')) {
					return basePower * 1.2;
				}
			},
			onTakeItem: function(item, pokemon, source) {
				if ((source && source.template.num === 487) || pokemon.template.num === 487) {
					return false;
				}
			},
			onBasePower: function(basePower, user) {
				if (user.template.species === 'Mewtwo') return basePower * 1.5;
			},
			desc: "Raises the Base Power of Giratina's STAB moves 20% and transforms Giratina into Giratina-O when held. Cannot be removed or given to Giratina in battle. If Mewtwo holds this item, it's transformed into Mewtwo Orb."
		},
		"lightball": {
			id: "lightball",
			name: "Light Ball",
			spritenum: 251,
			fling: {
				basePower: 30,
				status: 'par'
			},
			onModifyAtk: function(atk, pokemon) {
				if (pokemon.template.species === 'Pikachu') {
					return atk * 2;
				}
				if (pokemon.template.species === 'Pichu') {
					return atk * 2.5;
				}
			},
			onModifySpA: function(spa, pokemon) {
				if (pokemon.template.species === 'Pikachu') {
					return spa * 2;
				}
				if (pokemon.template.species === 'Pichu') {
					return spa * 2.5;
				}
			},
			onModifyDef: function(def, pokemon) {
				if (pokemon.template.species === 'Pikachu') {
					return def * 2;
				}
				if (pokemon.template.species === 'Pichu') {
					return def * 2.5;
				}
			},
			onModifySpD: function(spd, pokemon) {
				if (pokemon.template.species === 'Pikachu') {
					return spd * 2;
				}
				if (pokemon.template.species === 'Pichu') {
					return spd * 2.5;
				}
			},
			desc: "Doubles Pikachu's Attack and Special Attack."
		},
		souldew: {
			inherit: true,
			onModifySpA: function(spa, pokemon) {
				if (pokemon.template.species === 'Latios' || pokemon.template.species === 'Latias' || pokemon.template.species === 'Dragonite') {
					return spa * 1.5;
				}
			},
			onModifySpD: function(spd, pokemon) {
				if (pokemon.template.species === 'Latios' || pokemon.template.species === 'Latias' || pokemon.template.species === 'Dragonite') {
					return spd * 1.5;
				}
			}
		},
		"stick": {
			id: "stick",
			name: "Stick",
			fling: {
				basePower: 60
			},
			spritenum: 475,
			// The Stick is a stand-in for a number of pokemon-exclusive items
			// introduced with Gen Next
			onModifyMove: function(move, user) {
				if (user.template.species === 'Farfetch\'d') {
					move.critRatio += 2;
				}
			},
			onModifyDef: function(def, pokemon) {
				if (pokemon.template.species === 'Spiritomb' && pokemon.ability !== 'shadowtag') {
					return def*1.5;
				}
			},
			onModifySpD: function(spd, pokemon) {
				if (pokemon.template.species === 'Spiritomb' && pokemon.ability !== 'shadowtag') {
					return spd*1.5;
				}
			},
			onModifySpe: function(spe, pokemon) {
				if (pokemon.template.species === 'Spiritomb' && pokemon.ability !== 'shadowtag') {
					return spe*2;
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 2,
			desc: "Does a number of effects."
		}
};