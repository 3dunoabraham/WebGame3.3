import CONSTANTS from '@/../script/constant/json/api.json'

const api_url = process.env.DATA_API_URL || CONSTANTS.DATA_API_URL

export const fetchUnits = async ( config:any = {} ): Promise<any> => {
  try {
    const response = await fetch(`${api_url}/units/`, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()).Units;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch ticker for symbol ${config}`);
  }
}