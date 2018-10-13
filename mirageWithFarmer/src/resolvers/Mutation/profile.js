const {
    getUserId
} = require('../../utils')


/**
{
  "personalDetails": {"update": {"cell": "88888888","idSA": "7777777777777", "landLine": "88888888", "lastName": "Wetter"},
  										"create": {"cell": "88888888","idSA": "7777777777777", "landLine": "88888888", "lastName": "Wetter"}},
  "address": {"update": {"area": "there","line1": "What there is","postalCode": "66644"},
    						"create": {"area": "there","line1": "What there is","postalCode": "66644"}},
  "farmingActivities": {"update": {"category": "Market Garden", "shortDescription": "Market Garden", "longDescription": "Carrots and Beans"},
    											"create": {"category": "Market Garden", "shortDescription": "Market Garden", "longDescription": "Carrots and Beans"}}
}





 */
const profile = {
    async updateStableInfo(parent, {
        personalDetails,
        address,
        farmingActivities
    }, ctx, info) {
        const userId = getUserId(ctx)
        return ctx.db.mutation.updateUser({
                data: {
                    personalDetails: {
                        upsert: personalDetails
                    },
                    address: {
                        upsert: address
                    },
                    farmingActivities: {
                        upsert: farmingActivities
                    }
                },
                where: {
                    id: userId
                }
            },
            info
        )
    },

    /** Example from post.js
     * 
        async createDraft(parent, {
            title,
            text
        }, ctx, info) {
            const userId = getUserId(ctx)
            return ctx.db.mutation.createPost({
                    data: {
                        title,
                        text,
                        isPublished: false,
                        author: {
                            connect: {
                                id: userId
                            },
                        },
                    },
                },
                info
            )
        },
     */
    // TODO: Change these to update mutations
    async createAddress(parent, {
        line1,
        line2,
        line3,
        area,
        postalCode,
        province,
    }, ctx, info) {
        const userId = getUserId(ctx)
        return ctx.db.mutation.createAddress({
                data: {
                    line1,
                    line2,
                    line3,
                    area,
                    postalCode,
                    province,
                    resident: {
                        connect: {
                            id: userId
                        },
                    },
                },
            },
            info
        )
    },
    async createPersonalDetails(parent, {
        lastName,
        cell,
        landLine,
        idSA,
    }, ctx, info) {
        const userId = getUserId(ctx)
        return ctx.db.mutation.createPersonalDetails({
                data: {
                    lastName,
                    cell,
                    landLine,
                    idSA,
                    person: {
                        connect: {
                            id: userId
                        },
                    },
                },
            },
            info
        )
    },
    async createFarmingActivities(parent, {
        category,
        shortDescription,
        longDescription,

    }, ctx, info) {
        const userId = getUserId(ctx)
        return ctx.db.mutation.createFarmingActivities({
                data: {
                    category,
                    shortDescription,
                    longDescription,
                    farmer: {
                        connect: {
                            id: userId
                        },
                    },
                },
            },
            info
        )
    },
    async createFarm(parent, {
        totalLand,
        cultivatedLand,
        shareLocation,
        farmersAssociations,
        lat,
        lng
    }, ctx, info) {
        const userId = getUserId(ctx)
        
        return ctx.db.mutation.createFarm({
                data: {
                    totalLand,
                    cultivatedLand,
                    shareLocation,
                    farmersAssociations,
                    gpsPoints: {
                        create: {
                            lat,
                            lng
                        }
                    },
                    farmer: {
                        connect: {
                            id: userId
                        }
                    } 
                }
            }, 
            info
        ) 
    }
}





module.exports = {
    profile
}