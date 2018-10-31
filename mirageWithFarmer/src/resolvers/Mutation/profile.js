const {
    getUserId
} = require('../../utils')


const profile = {
    async updateStableInfo(parent, {
        cell,
        idSA,
        landLine,
        lastName,
        addArea,
        addOne,
        addTwo,
        addThree,
        postalCode,
        province,
        farmingCategory,
        farmingDescription,
        farmingApproach,
        sellingCrops,
        sellingProducts,
        sellingLivestock
    }, ctx, info) {
        const userId = getUserId(ctx)
        return ctx.db.mutation.updateUser({
                where: {
                    id: userId
                },
                data: {
                    personalDetails: {
                        upsert: {
                            update: {
                                lastName: lastName,
                                cell: cell,
                                landLine: landLine,
                                idSA: idSA
                            },
                            create: {
                                lastName: lastName,
                                cell: cell,
                                landLine: landLine,
                                idSA: idSA
                            }
                        }
                    },
                    address: {
                        upsert: {
                            update: {
                                line1: addOne,
                                line2: addTwo,
                                line3: addThree,
                                area: addArea,
                                postalCode: postalCode,
                                province: province
                            },
                            create: {
                                line1: addOne,
                                line2: addTwo,
                                line3: addThree,
                                area: addArea,
                                postalCode: postalCode,
                                province: province
                            }
                        }
                    },
                    farmingActivities: {
                        upsert: {
                            update: {
                                category: farmingCategory,
                                shortDescription: farmingDescription,
                                cultivationApproach: farmingApproach,
                                selling: {
                                    update: {
                                        crops: sellingCrops,
                                        livestock: sellingLivestock,
                                        products: sellingProducts
                                    }
                                }
                            },
                            create: {
                                category: farmingCategory,
                                shortDescription: farmingDescription,
                                cultivationApproach: farmingApproach,
                                selling: {
                                    create: {
                                        crops: sellingCrops,
                                        livestock: sellingLivestock,
                                        products: sellingProducts
                                    }
                                }
                            }
                        }
                    }
                },

            },
            info)
    },

    async updateFarm(parent, {
        name,
        totalLand,
        cultivatedLand,
        shareLocation,
        lat,
        lng,
        farmersAssociations,
    }, ctx, info) {
        const userId = getUserId(ctx)
        return ctx.db.mutation.updateUser({
                where: {
                    id: userId
                },
                data: {
                    farm: {
                        upsert: {
                            update: {
                                name,
                                totalLand,
                                cultivatedLand,
                                shareLocation,
                                farmersAssociations,
                                gpsPoints: {
                                    upsert: {
                                        update: {
                                            lat: lat,
                                            lng: lng
                                        },
                                        create: {
                                            lat: lat,
                                            lng: lng
                                        }
                                    }
                                }
                            },
                            create: {
                                name,
                                totalLand,
                                cultivatedLand,
                                shareLocation,
                                farmersAssociations,
                                gpsPoints: {
                                    create: {
                                        lat: lat,
                                        lng: lng
                                    }
                                }
                            }
                        }
                    }
                }
            },
            info
        )
    },
    async createCrop(parent, {
        farmId,
        category,
        name,
        description,
        startDate,
        endDate,
    }, ctx, info) {
        return ctx.db.mutation.createCrop({
                data: {
                    category,
                    name,
                    description,
                    harvestWindow: {
                        create: {
                            from: startDate,
                            to: endDate
                        }
                    },
                    farm: {
                        connect: {
                            id: farmId
                        }
                    }
                }
            },
            info
        )
    },


    async createProduct(parent, {
        farmId,
        name,
        description,
        unit,
        stockLevel,
        price,
        imageSrc,
        imageName,
    }, ctx, info) {
        return ctx.db.mutation.createProduct({
                data: {
                    name,
                    description,
                    unit,
                    stockLevel,
                    price,
                    imageSrc,
                    imageName,
                    farm: {
                        connect: {
                            id: farmId
                        }
                    }
                }
            },
            info
        )
    },

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