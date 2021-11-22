import { createSlice } from "@reduxjs/toolkit";
import { apiCaller } from "../../api/apiCaller";
import { playerapi } from "../../sharedfiles/EndpointConfig";

export const PlayerActivitySlice = createSlice({
  name: "playeractivity",
  initialState: {
    playerActivityData: [],
    paginationFirstValue: 1,
    paginationSecondValue: 15,
  },
  reducers: {
    setPlayerActivityData: (state, action) => {
      state.playerActivityData = action.payload;
    },
    setPaginationFirstValue: (state, action) => {
      state.paginationFirstValue = action.payload;
    },
    setPaginationSecondValue: (state, action) => {
      state.paginationSecondValue = action.payload;
    },
  },
});
export const {setPlayerActivityData,setPaginationFirstValue,setPaginationSecondValue} = PlayerActivitySlice.actions;

export const getPlayerActivity =(pagenumbervalue, itemperpagevalue,params) => (dispatch) => {
    var obj = {
     "brand":params.brand
    };
    var url =`${playerapi.getPlayerActivity}` + "?itemsPerPage=" +itemperpagevalue +"&pageNumber=" +pagenumbervalue;

    apiCaller(url, "POST",obj).then((response) => {
      if (response !== null && response) {
        if (response.status == 200) {
          dispatch(setPlayerActivityData(response.data));
        }
      }
    });
  };

export default PlayerActivitySlice.reducer;
