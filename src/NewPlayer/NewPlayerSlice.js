import { createSlice } from "@reduxjs/toolkit";
import { apiCaller } from "../../api/apiCaller";
import { playerapi } from "../../sharedfiles/EndpointConfig";

export const NewPlayerSlice = createSlice({
  name: "newplayer",
  initialState: {
    newPlayerData: [],
    paginationFirstValue: 1,
    paginationSecondValue: 15,
    activePage: ["none", "1"],
  },
  reducers: {
    setNewPlayerData: (state, action) => {
      state.newPlayerData = action.payload;
    },
    setPaginationFirstValue: (state, action) => {
      state.paginationFirstValue = action.payload;
    },
    setPaginationSecondValue: (state, action) => {
      state.paginationSecondValue = action.payload;
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
  },
});
export const {
  setNewPlayerData,
  setPaginationFirstValue,
  setPaginationSecondValue,
  setActivePage,
} = NewPlayerSlice.actions;

export const getNewPlayer =
  (pagenumbervalue, itemperpagevalue, params) => (dispatch) => {
    var obj = {
      affiliateBtag: params.affiliateBTAG,
      affiliateBtagName: params.affiliateName,
      brand: params.brand,
      country: params.country,
      currency: params.currency,
      referralCode: params.referCode,
      registrationDateFrom: params.registrationFromdate,
      registrationDateTo: params.registrationTodate,
    };
    var url =
      `${playerapi.getNewPlayer}` +
      "?itemsPerPage=" +
      itemperpagevalue +
      "&pageNumber=" +
      pagenumbervalue;

    apiCaller(url, "POST", obj).then((response) => {
      if (response !== null && response) {
        if (response.status == 200) {
          dispatch(setNewPlayerData(response.data));
        }
      }
    });
  };

export default NewPlayerSlice.reducer;
