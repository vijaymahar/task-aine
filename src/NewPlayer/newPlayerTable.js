import React from "react";
import { connect } from "react-redux";
import ColumnResizer from "../ColumnResizer/ColumnResizer";
import "../../components/ColumnResizer/Table.css";
import { getBrowserDate } from "../../sharedfiles/helper";
class NewPlayerSeachTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("brands list :", this.props.SearchData);
    return (
      <>
        <div className="CMS-box CMS-table CMS-table-triped">
          {this.props.newPlayerData && this.props.newPlayerData.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Customer Id</th>
                  <ColumnResizer className="columnResizer" minWidth={0} />
                  <th>Username</th>
                  <ColumnResizer className="columnResizer" minWidth={0} />
                  <th>First Name</th>
                  <ColumnResizer className="columnResizer" minWidth={0} />
                  <th>Last Name </th>
                  <ColumnResizer className="columnResizer" minWidth={0} />
                  <th>Registration Date</th>
                  <ColumnResizer className="columnResizer" minWidth={0} />
                  <th>Affiliate Btag</th>
                  <ColumnResizer className="columnResizer" minWidth={0} />
                  <th>Affiliate Name </th>
                  <ColumnResizer className="columnResizer" minWidth={0} />
                  <th>Referrer Code</th>
                  <ColumnResizer className="columnResizer" minWidth={0} />
                  <th>Brand</th>
                  <ColumnResizer className="columnResizer" minWidth={0} />
                  <th>Country</th>
                  <ColumnResizer className="columnResizer" minWidth={0} />
                  <th>First Deposit Amount</th>
                  <ColumnResizer className="columnResizer" minWidth={0} />
                  <th>Bet Count</th>
                  <ColumnResizer className="columnResizer" minWidth={0} />
                  <th>Account Status</th>
                </tr>
              </thead>
              <tbody>
                {this.props.newPlayerData.length > 0 &&
                  this.props.newPlayerData
                    .filter((item) => {
                      if (
                        Object.keys(this.props.SearchData).length > 0 &&
                        this.props.SearchData.brand !== ""
                      ) {
                        return this.props.SearchData.brandsList.includes(
                          item.brand
                        );
                      } else {
                        return item;
                      }
                    })
                    .map((item, index) => {
                      var statusVal = "";
                      if (item.accountStatus === "ACTIVE") {
                        statusVal = "Active";
                      } else if (item.accountStatus === "SUSPENDED") {
                        statusVal = "Suspended";
                      } else if (item.accountStatus === "CLOSED") {
                        statusVal = "Closed";
                      }

                      return (
                        <tr key={item.userId}>
                          <td>
                            <a href="#">{item.userId}</a>
                          </td>
                          <td></td>
                          <td>{item.userName}</td>
                          <td></td>
                          <td>{item.firstName} </td>
                          <td></td>
                          <td>{item.lastName} </td>
                          <td></td>
                          <td>{getBrowserDate(item.registrationDate)}</td>
                          <td></td>
                          <td>{item.affiliateBtag} </td>
                          <td></td>
                          <td>{item.affiliateBtagName} </td>
                          <td></td>
                          <td>{item.refCode} </td>
                          <td></td>
                          <td>{item.brand} </td>
                          <td></td>
                          <td>
                            <i class="CMS-flags CMS-029-kenya"></i>
                            {item.country}
                          </td>
                          <td></td>
                          <td>{item.firstDeposit} </td>
                          <td></td>
                          <td>{item.betCount} </td>
                          <td></td>
                          <td>
                            <div class={`CMS-btnStatus CMS-status${statusVal}`}>
                              {item.accountStatus}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          )}
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    newPlayerData: state.newplayer.newPlayerData,
  };
}

export default connect(mapStateToProps)(NewPlayerSeachTable);
