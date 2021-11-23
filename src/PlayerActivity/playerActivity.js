import React from "react";
import { connect } from "react-redux";
import PlayerActivityTable from "./playerActivityTable";
import { setSidebarTabs } from "../sidebar/sidebarSlice";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getPlayerActivity,
  setPaginationFirstValue,
  setPaginationSecondValue,
} from "./playerActivitySlice";

class playerActivity extends React.Component {
  constructor(props) {
    super(props);
    this.refVal = React.createRef();
    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      country: "",
      startdatepicker: new Date("01/01/2021"),
      enddatepicker: new Date("01/12/2030"),
      brand: "",
      playerSegement: "",
      open: false,
      countryCondition: false,
      segmentLevel: false,
      isChecked: "",
      itemsPerPage: "",
      searchData: {},
      currentPage: 1,
      isActive: "",
    };
    this.onChangeEndDatepicker = this.onChangeEndDatepicker.bind(this);
    this.onChangeStartDatepicker = this.onChangeStartDatepicker.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.brandHandler = this.brandHandler.bind(this);
    this.countryHandler = this.countryHandler.bind(this);
    this.segmentLevelHandler = this.segmentLevelHandler.bind(this);
    this.setItemsPerPage = this.setItemsPerPage.bind(this);
    this.setPageValue = this.setPageValue.bind(this);
    this.setNextPageValue = this.setNextPageValue.bind(this);
    this.setBeforePageValue = this.setBeforePageValue.bind(this);
  }

  resetButton() {
    this.setState({
      username: "",
      firstName: "",
      lastName: "",
      country: "",
      startdatepicker: "",
      enddatepicker: "",
      brand: "",
      playerSegement: "",
      isChecked: false,
      searchData: {},
    });
  }

  onChangeEndDatepicker(date) {
    this.setState({ enddatepicker: date });
  }
  onChangeStartDatepicker(date) {
    this.setState({ startdatepicker: date });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  brandHandler(e) {
    this.setState({ brand: e.target.value });
    this.setState({ open: false });
  }

  handleDropdown = () => {
    this.setState({ open: !this.state.open });
  };

  //   country handler //
  countryHandler(e) {
    this.setState({ country: e.target.value });
    this.setState({ countryCondition: false });
  }

  handleCountryDropdown = () => {
    this.setState({ countryCondition: !this.state.countryCondition });
  };
  //   country handler //

  segmentLevelHandler(e) {
    this.setState({ playerSegement: e.target.value });
    this.setState({ segmentLevel: false });
  }
  handelSegmentDropdown = () => {
    this.setState({ segmentLevel: !this.state.segmentLevel });
  };

  //   pagination handler //
  setPageValue(e) {
    this.setState({ currentPage: +e.target.name });
    console.log("current-page number: ", this.state.currentPage, e.target.name);
    this.setPage(+e.target.name);
    this.setState({ isActive: "" });
  }

  setNextPageValue = () => {
    this.setState({
      currentPage: this.state.currentPage + 1,
      isActive: "next",
    });
    this.setPage(this.state.currentPage + 1);
  };
  setBeforePageValue = () => {
    if (this.state.currentPage >= 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
        isActive: "previous",
      });
      this.setPage(this.state.currentPage - 1);
    }
  };

  setPage(pageNumber) {
    this.props.dispatch(setPaginationFirstValue(pageNumber));
    this.props.dispatch(
      getPlayerActivity(
        this.props.paginationFirstValue,
        this.props.paginationSecondValue,
        {}
      )
    );
  }
  setItemsPerPage(e) {
    this.setState({ itemsPerPage: e.target.value });
    this.props.dispatch(setPaginationSecondValue(e.target.value));
    this.props.dispatch(
      getPlayerActivity(this.props.paginationFirstValue, e.target.value, {})
    );
  }
  // pagination handler //

  //   SUBMIT HANDLER //
  onFormSubmit(e) {
    e.preventDefault();
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({
      searchData: {
        startdatepicker: this.state.startdatepicker,
        enddatepicker: this.state.enddatepicker,
        brand: this.state.brand,
        playerSegement: this.state.playerSegement,
        country: this.state.country,
      },
    });
    let dataplayer = {};
    this.props.dispatch(
      getPlayerActivity(
        this.props.paginationFirstValue,
        this.props.paginationSecondValue,
        dataplayer
      )
    );
  }
  //   SUBMIT HANDLER //

  deleteTab(item) {
    const newTabs = this.props.sidebarTabs.filter(
      (i) => i.subtitle !== item.subtitle
    );
    this.setState({ closeIcon: !this.state.closeIcon });
    this.props.dispatch(setSidebarTabs(newTabs));
    if (newTabs.length > 0) {
      this.props.history.push(`${newTabs[newTabs.length - 1].path}`);
    } else {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <>
        <div className="CMS-layout-innerContent">
          <div className="CMS-page CMS-playerActivity">
            <div className="CMS-page-content">
              <div className="CMS-full-page-content">
                <div className="CMS-page-tabs">
                  <ul>
                    {this.props.sidebarTabs.length > 0 &&
                      this.props.sidebarTabs.map((item, index) => {
                        return (
                          <>
                            <li
                              key={index}
                              className={
                                item.subtitle == "Player Activity"
                                  ? "active"
                                  : ""
                              }
                            >
                              <Link to={item.path}>{item.subtitle}</Link>
                              <span className="close">
                                <span
                                  className="material-icons md-18"
                                  data-icon="close"
                                  onClick={this.deleteTab.bind(this, item)}
                                ></span>{" "}
                              </span>
                            </li>
                          </>
                        );
                      })}
                  </ul>
                </div>
                <form>
                  <div className="CMS-page CMS-playerSearch">
                    <div className="CMS-tabs-content">
                      <div
                        className="CMS-tab-panel active"
                        id="CMS-playerActivity"
                      >
                        <div className="CMS-tabContent">
                          <div className="CMS-box CMS-box-content">
                            <div className="row no-gutters">
                              <div className="col-6">
                                <div className="CMS-formGroup formGroup-inline">
                                  <div className="col-6">
                                    <div className="CMS-formLabel">
                                      Start Date
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="CMS-formControl-group">
                                      <form onSubmit={this.onFormSubmit}>
                                        <div className="form-group">
                                          <DatePicker
                                            selected={
                                              this.state.startdatepicker
                                            }
                                            onChange={
                                              this.onChangeStartDatepicker
                                            }
                                            name="startDate"
                                            dateFormat="dd-MM-yyyy"
                                          />
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="CMS-formGroup formGroup-inline">
                                  <div className="col-6">
                                    <div className="CMS-formLabel">
                                      End Date
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="CMS-formControl-group">
                                      <form onSubmit={this.onFormSubmit}>
                                        <div className="form-group">
                                          <DatePicker
                                            selected={this.state.enddatepicker}
                                            onChange={
                                              this.onChangeEndDatepicker
                                            }
                                            name="endDate"
                                            dateFormat="dd-MM-yyyy"
                                          />
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row no-gutters">
                              <div className="col-6">
                                <div className="CMS-formGroup formGroup-inline">
                                  <div className="col-6">
                                    <div
                                      className="CMS-formLabel"
                                      value="brand"
                                    >
                                      Brand
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="CMS-formControl">
                                      <div
                                        className={
                                          "CMS-dropdown CMS-brands-dropdown" +
                                          `${this.state.open ? " active" : ""}`
                                        }
                                      >
                                        <div
                                          className="CMS-dropdown-btn"
                                          onClick={this.handleDropdown}
                                        >
                                          {this.state.brand
                                            ? this.state.brand
                                            : "Select Brand"}
                                        </div>
                                        <div className="CMS-dropdown-menu CMS-form-group">
                                          <div className="CMS-checkbox">
                                            <input
                                              id="Kenya"
                                              type="checkbox"
                                              value="KEN"
                                              onClick={this.brandHandler}
                                            />
                                            <label htmlFor="Kenya"></label>
                                            <span className="SB-checkboxLabel">
                                              Ken
                                            </span>
                                          </div>
                                          <div className="CMS-checkbox">
                                            <input
                                              id="UG"
                                              type="checkbox"
                                              value="UG"
                                              onClick={this.brandHandler}
                                            />
                                            <label htmlFor="UG"></label>
                                            <span className="SB-checkboxLabel">
                                              UG
                                            </span>
                                          </div>
                                          <div className="CMS-checkbox">
                                            <input
                                              id="NG"
                                              type="checkbox"
                                              value="NG"
                                              onClick={this.brandHandler}
                                            />
                                            <label htmlFor="NG"></label>
                                            <span className="SB-checkboxLabel">
                                              NG
                                            </span>
                                          </div>
                                          <div className="CMS-checkbox">
                                            <input
                                              id="ZM"
                                              type="checkbox"
                                              value="ZM"
                                              onClick={this.brandHandler}
                                            />
                                            <label htmlFor="ZM"></label>
                                            <span className="SB-checkboxLabel">
                                              ZM
                                            </span>
                                          </div>
                                          <div className="CMS-checkbox">
                                            <input
                                              id="TZ"
                                              type="checkbox"
                                              value="TZ"
                                              onClick={this.brandHandler}
                                            />
                                            <label htmlFor="TZ"></label>
                                            <span className="SB-checkboxLabel">
                                              TZ
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="row no-gutters">
                              <div className="col-6">
                                <div className="CMS-formGroup formGroup-inline">
                                  <div className="col-6">
                                    <div className="CMS-formLabel">
                                      Countries
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div
                                      className="CMS-formControl"
                                      value={this.state.country}
                                      name="country"
                                    >
                                      <div
                                        className={
                                          "CMS-dropdown CMS-brands-dropdown" +
                                          `${
                                            this.state.countryCondition
                                              ? " active"
                                              : ""
                                          }`
                                        }
                                      >
                                        <div
                                          className="CMS-dropdown-btn"
                                          onClick={this.handleCountryDropdown}
                                        >
                                          {this.state.country
                                            ? this.state.country
                                            : "Select Country"}
                                        </div>
                                        <div className="CMS-dropdown-menu CMS-form-group">
                                          <div className="CMS-checkbox">
                                            <input
                                              id="Kenya"
                                              type="checkbox"
                                              value="Kenya"
                                              onClick={this.countryHandler}
                                            />
                                            <label htmlFor="Kenya"></label>
                                            <span className="SB-checkboxLabel">
                                              Kenya
                                            </span>
                                          </div>
                                          <div className="CMS-checkbox">
                                            <input
                                              id="Uganda"
                                              type="checkbox"
                                              value="Uganda"
                                              onClick={this.countryHandler}
                                            />
                                            <label htmlFor="UG"></label>
                                            <span className="SB-checkboxLabel">
                                              Uganda
                                            </span>
                                          </div>
                                          <div className="CMS-checkbox">
                                            <input
                                              id="Nigeria"
                                              type="checkbox"
                                              value="Nigeria"
                                              onClick={this.countryHandler}
                                            />
                                            <label htmlFor="NG"></label>
                                            <span className="SB-checkboxLabel">
                                              Nigeria
                                            </span>
                                          </div>
                                          <div className="CMS-checkbox">
                                            <input
                                              id="Zambia"
                                              type="checkbox"
                                              value="Zambia"
                                              onClick={this.countryHandler}
                                            />
                                            <label htmlFor="ZM"></label>
                                            <span className="SB-checkboxLabel">
                                              Zambia
                                            </span>
                                          </div>
                                          <div className="CMS-checkbox">
                                            <input
                                              id="Tanzania"
                                              type="checkbox"
                                              value="Tanzania"
                                              onClick={this.countryHandler}
                                            />
                                            <label htmlFor="TZ"></label>
                                            <span className="SB-checkboxLabel">
                                              Tanzania
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="row no-gutters">
                              <div className="col-6">
                                <div className="CMS-formGroup formGroup-inline">
                                  <div className="col-6">
                                    <div className="CMS-formLabel">
                                      Segment Level
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="CMS-formControl">
                                      <div
                                        className={
                                          "CMS-dropdown CMS-brands-dropdown" +
                                          `${
                                            this.state.segmentLevel
                                              ? " active"
                                              : ""
                                          }`
                                        }
                                      >
                                        <div
                                          className="CMS-dropdown-btn"
                                          onClick={this.handelSegmentDropdown}
                                        >
                                          {this.state.playerSegement
                                            ? this.state.playerSegement
                                            : "Select Level"}
                                        </div>
                                        <div className="CMS-dropdown-menu CMS-form-group">
                                          <div className="CMS-checkbox">
                                            <input
                                              id="VIP"
                                              type="checkbox"
                                              value="VIP"
                                              onClick={this.segmentLevelHandler}
                                              className="segmentCheck"
                                            />
                                            <label for="VIP"></label>
                                            <span className="SB-checkboxLabel">
                                              VIP
                                            </span>
                                          </div>
                                          <div className="CMS-checkbox">
                                            <input
                                              id="Preferred Players"
                                              type="checkbox"
                                              value="Preferred Players"
                                              onClick={this.segmentLevelHandler}
                                              className="segmentCheck"
                                            />
                                            <label for="Preferred Players"></label>
                                            <span className="SB-checkboxLabel">
                                              Preferred Players
                                            </span>
                                          </div>
                                          <div className="CMS-checkbox">
                                            <input
                                              id="Level 3"
                                              type="checkbox"
                                              value="Level 3"
                                              onClick={this.segmentLevelHandler}
                                              className="segmentCheck"
                                            />
                                            <label for="Level 3"></label>
                                            <span className="SB-checkboxLabel">
                                              Level 3
                                            </span>
                                          </div>
                                          <div className="CMS-checkbox">
                                            <input
                                              id="Level 2"
                                              type="checkbox"
                                              value="Level 2"
                                              onClick={this.segmentLevelHandler}
                                              className="segmentCheck"
                                            />
                                            <label for="Level 2"></label>
                                            <span className="SB-checkboxLabel">
                                              Level 2
                                            </span>
                                          </div>
                                          <div className="CMS-checkbox">
                                            <input
                                              id="Level 1"
                                              type="checkbox"
                                              value="Level 1"
                                              onClick={this.segmentLevelHandler}
                                              className="segmentCheck"
                                            />
                                            <label for="Level 1"></label>
                                            <span className="SB-checkboxLabel">
                                              Level 1
                                            </span>
                                          </div>
                                          <div className="CMS-checkbox">
                                            <input
                                              id="Stake"
                                              type="checkbox"
                                              value="Stake Factored Customers"
                                              onClick={this.segmentLevelHandler}
                                              className="segmentCheck"
                                            />
                                            <label for="Stake"></label>
                                            <span className="SB-checkboxLabel">
                                              Stake Factored Customers
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12">
                                <div className="CMS-btnContainer">
                                  <button
                                    onClick={(e) => this.onSubmit(e)}
                                    className="CMS-btn CMS-btnSecondary active CMS-btnMedium"
                                    type="button"
                                  >
                                    Search
                                  </button>
                                  <button
                                    onClick={() => this.resetButton()}
                                    className="CMS-btn CMS-btnQuaternary active CMS-btnMedium"
                                    type="button"
                                  >
                                    Reset
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="CMS-filter-result" id="result">
                            <div className="CMS-pagination">
                              <div className="CMS-pagination-container">
                                <div className="CMS-pagination-list">
                                  <ul>
                                    <li>
                                      <a href="#">
                                        <span
                                          className="material-icons"
                                          data-icon="first_page"
                                        ></span>
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="#"
                                        onClick={this.setBeforePageValue}
                                        className={
                                          this.state.isActive == "previous"
                                            ? "active"
                                            : ""
                                        }
                                      >
                                        <span
                                          className="material-icons"
                                          data-icon="navigate_before"
                                        ></span>
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="active"
                                        href="#"
                                        name="1"
                                        onClick={this.setPageValue}
                                        className={
                                          this.state.currentPage == 1
                                            ? "active"
                                            : ""
                                        }
                                      >
                                        1
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="#"
                                        name="2"
                                        onClick={this.setPageValue}
                                        className={
                                          this.state.currentPage == 2
                                            ? "active"
                                            : ""
                                        }
                                      >
                                        2
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="#"
                                        name="3"
                                        onClick={this.setPageValue}
                                        className={
                                          this.state.currentPage == 3
                                            ? "active"
                                            : ""
                                        }
                                      >
                                        3
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="#"
                                        onClick={this.setNextPageValue}
                                        className={
                                          this.state.isActive == "next"
                                            ? "active"
                                            : ""
                                        }
                                      >
                                        <span
                                          className="material-icons"
                                          data-icon="navigate_next"
                                        ></span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <span
                                          className="material-icons"
                                          data-icon="last_page"
                                        ></span>
                                      </a>
                                    </li>
                                  </ul>
                                </div>

                                <div className="CMS-page-slection">
                                  <div className="CMS-number-of-files CMS-select">
                                    <select
                                      id="country"
                                      name="File"
                                      onChange={this.setItemsPerPage}
                                    >
                                      <option value="">select</option>
                                      <option value="25">25</option>
                                      <option value="50">50</option>
                                      <option value="100">100</option>
                                      <option value="200">200</option>
                                      <option value="500">500</option>
                                    </select>
                                  </div>
                                  <div className="CMS-file-type CMS-select">
                                    <select id="country" name="File">
                                      <option value="PDF">PDF</option>
                                      <option value="CSV">CSV</option>
                                      <option value="XLS">XLS</option>
                                    </select>
                                  </div>
                                  <div className="CMS-download-icon">
                                    <a href="#">
                                      <span
                                        className="material-icons"
                                        data-icon="file_download"
                                      ></span>
                                    </a>
                                  </div>
                                </div>

                                <div className="CMS-page-results">
                                  Results 1-100 of 108
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <PlayerActivityTable searchData={this.state.searchData} />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    sidebarTabs: state.sidebar.sidebarTabs,
    paginationFirstValue: state.playeractivity.paginationFirstValue,
    paginationSecondValue: state.playeractivity.paginationSecondValue,
  };
}
export default connect(mapStateToProps)(playerActivity);
