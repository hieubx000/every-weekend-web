import initData from "./initData"

export const convertFacilitiesFromEnum = (value: number) => {
    return initData.hotelFacilities.find((item) => {
        return item.value === value
    })

}