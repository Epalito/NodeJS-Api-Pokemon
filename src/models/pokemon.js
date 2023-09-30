const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Le nom est déjà pris.'
        },
        validate: {
          notEmpty: { msg: "Le nom du Pokémon est un champ obligatoire, veuillez le remplir."},
          notNull: { msg: "Le nom du Pokémon est un champ obligatoire, veuillez le remplir."}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez uniquement des nombres entiers pour les points de vie."},
          notNull: { msg: 'Les points de vie sont une propriété requise.'},
          min: {
            args: [0],
            msg: 'Les points de vie du Pokémon ne peuvent pas être inférieur ou égal à 0.'
          },
          max: {
            args: [999],
            msg: 'Les points de vie du Pokémon ne peuvent pas être supérieur à 999.'
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez uniquement des nombres entiers pour les points de dégât."},
          notNull: { msg: 'Les points de dégât sont une propriété requise.'},
          min: {
            args: [0],
            msg: 'Les points de dégât du Pokémon ne peuvent pas être inférieur ou égal à 0.'
          },
          max: {
            args: [99],
            msg: 'Les points de dégât du Pokémon ne peuvent pas être supérieur à 99.'
          }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: { msg: "Utilisez uniquement les liens URL pour les images de Pokémons."},
          notNull: { msg: "L'URL de l'image du Pokémon est un champ obligatoire, veuillez le remplir."}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
           return this.getDataValue('types').split(',')
        },
        set(types) {
          this.setDataValue('types', types.join())
        },
        validate: {
          isTypesValid(value) {
            if(!value) {
              throw new Error('Un pokémon doit au moins avoir un type.')
            }
            if(value.split(',').length > 3) {
              throw new Error('Un pokémon ne peut pas avoir plus de trois types.')
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)) {
                throw new Error (`Le type d'un Pokémon doit appartenir à la liste suivant : $(validTypes)`)
              }
            });
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }