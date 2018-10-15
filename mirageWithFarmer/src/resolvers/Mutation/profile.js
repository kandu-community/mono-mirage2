const {
    getUserId
} = require('../../utils')


const profile = {
    async updateStableInfo(parent, {
        personalDetails1,
        personalDetails2,
        farmingActivities1,
        farmingActivities2,
        address1,
        address2,
    }, ctx, info) {
        const userId = getUserId(ctx)
        return ctx.db.mutation.updateUser({
                where: {
                    id: userId
                },
                data: {
                    personalDetails: {
                        upsert: {
                            update: personalDetails1,
                            create: personalDetails2
                        }
                    },
                    farmingActivities: {
                        upsert: {
                            update: farmingActivities1,
                            create: farmingActivities2
                        }
                    },
                    address: {
                        upsert: {
                            update: address1,
                            create: address2
                        }
                    }

                },

            },
            info)
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
        cultivationApproach,
        crops,
        livestock,
        products

    }, ctx, info) {
        const userId = getUserId(ctx)
        return ctx.db.mutation.createFarmingActivities({
                data: {
                    category,
                    shortDescription,
                    cultivationApproach,
                    selling: {
                        create: {
                            crops,
                            livestock,
                            products,
                        }
                    },
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