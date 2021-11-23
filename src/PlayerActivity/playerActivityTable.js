import React from "react";
import { connect } from "react-redux";

class PlayerActivityTable extends React.Component {
  filterByReference = (arr1, arr2) => {
    let res = [];
    res = arr1.filter((el) => {
      return arr2.find((element) => {
        return (
          element.firstName.toUpperCase() === el.firstName.toUpperCase() ||
          element.lastName.toUpperCase() === el.lastName.toUpperCase()
        );
      });
    });
    return res;
  };

  render() {
    // console.log("player search data:", this.props.searchData);
    return (
      <>
        {this.props.playerActivityData &&
          this.props.playerActivityData.length > 0 && (
            <div className="CMS-box CMS-table CMS-table-triped">
              <table>
                <thead>
                  <tr>
                    <th>Customer Id</th>
                    <th>User ID</th>
                    <th>Brand</th>
                    <th>Country</th>
                    <th>Currency</th>
                    <th>Reg Date</th>
                    <th>Turnover</th>
                    <th>GGR</th>
                    <th>Margin %</th>
                    <th>Bet Count</th>
                    <th>Average Bet Stake</th>
                    <th>Segment</th>
                    <th>Account Age</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.playerActivityData
                    /* .filter((item) => {
                      if (Object.keys(this.props.searchData).length > 0) {
                        return (
                          item.playerSegment ==
                            this.props.searchData.playerSegement ||
                          item.country == this.props.searchData.country ||
                          item.brand == this.props.searchData.brand
                        );
                      } else {
                        return item;
                      }
                    }) */
                    .map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.partyId}</td>
                          <td>{item.userId}</td>
                          <td>{item.brand}</td>
                          <td>{item.country}</td>
                          <td>{item.currency}</td>
                          <td>{item.registrationDate}</td>
                          <td>{item.turnOver}</td>
                          <td>{item.ggr}</td>
                          <td>{item.margin}</td>
                          <td>{item.betCount}</td>
                          <td>{item.stakeAverage}</td>
                          <td>{item.playerSegment}</td>
                          <td>{item.accountAge}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    playerActivityData: state.playeractivity.playerActivityData,
  };
}
export default connect(mapStateToProps)(PlayerActivityTable);
