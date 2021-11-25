import React from "react";
import NewPlayerSeachTable from "./newPlayerTable";
import { connect } from "react-redux";
import { setSidebarTabs } from "../sidebar/sidebarSlice";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { brandsData, currencyData, countryData } from "./newPlayerData";
import {
  getNewPlayer,
  setPaginationFirstValue,
  setPaginationSecondValue,
  setActivePage,
} from "./NewPlayerSlice";
class newPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.closeBrandDropdown = React.createRef();
    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      customerId: "",
      referCode: "",
      affiliateBTAG: "",
      affiliateName: "",
      country: "",
      registrationdate: "",
      registrationFromdate: new Date(),
      registrationTodate: new Date(),
      currency: "",
      brand: "",
      firstdepositAmount: "",
      AccountSatus: "",
      betCount: "",
      data: {},
      open: false,
      pageNumber: this.props.paginationFirstValue,
      isActive: "1",
      brandNames: [],
    };
    this.onChangeRegistrationFromDate =
      this.onChangeRegistrationFromDate.bind(this);
    this.onChangeRegistrationToDate =
      this.onChangeRegistrationToDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.brandHandler = this.brandHandler.bind(this);
    this.setPageNumber = this.setPageNumber.bind(this);
    this.setNextPageValue = this.setNextPageValue.bind(this);
    this.setBeforePageValue = this.setBeforePageValue.bind(this);
    this.setItemsPerPage = this.setItemsPerPage.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onChangeRegistrationFromDate(date) {
    this.setState({ registrationFromdate: date });
  }
  onChangeRegistrationToDate(date) {
    this.setState({ registrationTodate: date });
  }

  brandHandler = (e) => {
    this.setState({
      brand: e.target.value,
    });
    this.state.brandNames.push(e.target.value);
    this.setState({ open: false });
    console.log(this.state.brandNames);
  };

  handleClickDropdown = () => {
    this.setState({ open: !this.state.open });
  };

  // pagination functions //
  callAPi(firstValue) {
    this.props.dispatch(
      getNewPlayer(firstValue, this.props.paginationSecondValue, {})
    );
  }
  setPageNumber(e) {
    if (e.target.name == 1 || 2 || 3) {
      this.props.dispatch(setPaginationFirstValue(+e.target.name));
      this.props.dispatch(setActivePage(["none", e.target.name]));
      this.callAPi(+e.target.name);
    } else if (e.target.name == "first") {
      this.props.dispatch(setPaginationFirstValue(1));
      this.props.dispatch(setActivePage(["first", "first"]));
      this.props.dispatch(
        getNewPlayer(
          this.props.paginationFirstValue,
          this.props.paginationSecondValue,
          {}
        )
      );
    }
  }

  setNextPageValue = () => {
    this.props.dispatch(
      setPaginationFirstValue(this.props.paginationFirstValue + 1)
    );
    this.props.dispatch(
      setActivePage([this.props.paginationFirstValue, "next"])
    );
    this.callAPi(this.props.paginationFirstValue);
  };
  setBeforePageValue() {
    if (this.props.paginationFirstValue > 0) {
      this.props.dispatch(
        setPaginationFirstValue(this.props.paginationFirstValue - 1)
      );
      this.props.dispatch(
        setActivePage([this.props.paginationFirstValue, "before"])
      );
      this.callAPi(this.props.paginationFirstValue);
    }
  }
  // pagination functions //

  setItemsPerPage(e) {
    this.props.dispatch(setPaginationSecondValue(e.target.value));
    this.props.dispatch(
      getNewPlayer(this.props.paginationFirstValue, e.target.value, {})
    );
  }

  onFormSubmit(e) {
    e.preventDefault();
  }
  resetButton() {
    this.setState({
      firstName: "",
      lastName: "",
      customerId: "",
      affiliateBTAG: "",
      affiliateName: "",
      referCode: "",
      country: "",
      registrationFromdate: "",
      registrationTodate: "",
      brand: "",
      currency: "",
    });
    this.setState({ data: {} });
    this.setState({ brandNames: [] });
    this.props.dispatch(setPaginationSecondValue(15));
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      data: {
        brand: this.state.brand,
        currency: this.state.currency,
        country: this.state.country,
        referCode: this.state.referCode,
        registrationFromdate: this.state.registrationFromdate,
        registrationTodate: this.state.registrationTodate,
        affiliateBTAG: this.state.affiliateBTAG,
        affiliateName: this.state.affiliateName,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        brandsList: this.state.brandNames,
      },
    });
    let newPlayerData = {
      country: this.state.country,
      registrationFromdate: this.state.registrationFromdate,
      registrationTodate: this.state.registrationTodate,
      currency: this.state.currency,
      AccountSatus: this.state.AccountSatus.toUpperCase(),
      affiliateBTAG: this.state.affiliateBTAG,
      affiliateName: this.state.affiliateName,
      referCode: this.state.referCode,
    };
    this.props.dispatch(
      getNewPlayer(
        this.props.paginationFirstValue,
        this.props.paginationSecondValue,
        {}
      )
    );
  }
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

  handleClickOutside(e) {
    if (
      this.closeBrandDropdown.current &&
      !this.closeBrandDropdown.current.contains(e.target)
    ) {
      this.setState({ open: false });
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    this.props.dispatch(
      setPaginationFirstValue(this.props.paginationFirstValue)
    );
    this.props.dispatch(
      setPaginationSecondValue(this.props.paginationSecondValue)
    );
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  render() {
    console.log("isActive", this.props.activePage);
    return (
      <>
        <div className="CMS-page CMS-newPlayer">
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
                              item.subtitle == "NEW PLAYERS" ? "active" : ""
                            }
                          >
                            <Link to={item.path}>{item.subtitle} </Link>
                            <span className="close">
                              <span
                                onClick={this.deleteTab.bind(this, item)}
                                className="material-icons md-18"
                                data-icon="close"
                              ></span>{" "}
                            </span>
                          </li>
                        </>
                      );
                    })}
                </ul>
              </div>
              <form>
                <div className="CMS-tabs-content">
                  <div className="CMS-tab-panel active" id="CMS-betting">
                    <div className="CMS-tabContent">
                      <div className="CMS-box CMS-box-content">
                        <div className="row">
                          <div className="col-3">
                            <div className="CMS-formGroup">
                              <div className="CMS-formLabel">Brand</div>
                              <div
                                className={
                                  "CMS-dropdown CMS-brands-dropdown CMS-formControl" +
                                  `${this.state.open ? " active" : ""}`
                                }
                                ref={this.closeBrandDropdown}
                              >
                                <div
                                  className="CMS-dropdown-btn"
                                  onClick={this.handleClickDropdown}
                                >
                                  {this.state.brand
                                    ? this.state.brand
                                    : "Select"}
                                </div>
                                <div className="CMS-dropdown-menu CMS-form-group">
                                  {brandsData.map((item, index) => {
                                    return (
                                      <div
                                        className="CMS-checkbox"
                                        key={item.id}
                                      >
                                        <input
                                          id={item.id}
                                          type="checkbox"
                                          value={item.value}
                                          onClick={this.brandHandler}
                                        />
                                        <label htmlFor={item.id}></label>
                                        <span className="SB-checkboxLabel">
                                          {item.value}
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-3">
                            <div className="CMS-formGroup">
                              <div className="CMS-formLabel">Currency</div>
                              <div className="CMS-dropdown CMS-formControl">
                                <div className="CMS-select">
                                  <select
                                    id="currency"
                                    name="currency"
                                    value={this.state.currency}
                                    onChange={this.onChangeHandler}
                                  >
                                    <option value="">Select</option>
                                    {currencyData.map((item, index) => {
                                      return (
                                        <option key={item.id} value={item.name}>
                                          {item.name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="CMS-formGroup">
                              <div className="CMS-formLabel">Country</div>
                              <div className="CMS-dropdown CMS-formControl">
                                <div className="CMS-select">
                                  <select
                                    name="country"
                                    value={this.state.country}
                                    onChange={this.onChangeHandler}
                                  >
                                    <option>Select</option>
                                    {countryData.map((country, ind) => {
                                      return (
                                        <option
                                          key={country.id}
                                          value={country.name}
                                        >
                                          {country.name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-3">
                            <div className="CMS-formGroup">
                              <div className="CMS-formLabel">Referrer Code</div>
                              <div className="CMS-formControl-group">
                                <div className="CMS-formControl">
                                  <input
                                    type="text"
                                    name="referCode"
                                    placeholder="Referrer Code"
                                    value={this.state.referCode}
                                    onChange={this.onChangeHandler}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-3">
                            <div className="CMS-formGroup">
                              <div className="CMS-formLabel">
                                Registration Date From
                              </div>
                              <div className="CMS-formControl-group">
                                <form onSubmit={this.onFormSubmit}>
                                  <div className="form-group">
                                    <DatePicker
                                      selected={this.state.registrationFromdate}
                                      onChange={
                                        this.onChangeRegistrationFromDate
                                      }
                                      name="FromDate"
                                      dateFormat="dd-MM-yyyy"
                                      showMonthDropdown
                                      showYearDropdown
                                      dropdownMode="select"
                                      placeholderText="01-01-2022"
                                    />
                                  </div>
                                </form>
                                <div class="CMS-formAddon">
                                  <span
                                    class="material-icons md-18"
                                    data-icon="calendar_today"
                                  ></span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="CMS-formGroup">
                              <div className="CMS-formLabel">
                                Registration Date To
                              </div>
                              <div className="CMS-formControl-group">
                                <form onSubmit={this.onFormSubmit}>
                                  <div className="form-group">
                                    <DatePicker
                                      selected={this.state.registrationTodate}
                                      onChange={this.onChangeRegistrationToDate}
                                      name="ToDate"
                                      dateFormat="dd-MM-yyyy"
                                      showMonthDropdown
                                      showYearDropdown
                                      dropdownMode="select"
                                      placeholderText="31-12-2030"
                                    />
                                  </div>
                                </form>
                                <div class="CMS-formAddon">
                                  <span
                                    class="material-icons md-18"
                                    data-icon="calendar_today"
                                  ></span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="CMS-formGroup">
                              <div className="CMS-formLabel">
                                Affiliate BTAG
                              </div>
                              <div className="CMS-formControl">
                                <input
                                  type="text"
                                  name="affiliateBTAG"
                                  placeholder="Affiliate BTAG"
                                  value={this.state.affiliateBTAG}
                                  onChange={this.onChangeHandler}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="CMS-formGroup">
                              <div className="CMS-formLabel">
                                Affiliate Name
                              </div>
                              <div className="CMS-formControl">
                                <input
                                  type="text"
                                  id=""
                                  name="affiliateName"
                                  placeholder="Affiliate Name"
                                  value={this.state.affiliateName}
                                  onChange={this.onChangeHandler}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="CMS-formGroup">
                              <div className="CMS-formLabel">First Name</div>
                              <div className="CMS-formControl">
                                <input
                                  type="text"
                                  name="firstName"
                                  placeholder="First Name"
                                  onChange={this.onChangeHandler}
                                  value={this.state.firstName}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className="CMS-formGroup">
                              <div className="CMS-formLabel">Last Name</div>
                              <div className="CMS-formControl">
                                <input
                                  type="text"
                                  placeholder="Last Name"
                                  name="lastName"
                                  value={this.state.lastName}
                                  onChange={this.onChangeHandler}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-20"></div>

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
                                type="reset"
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
                                  <a
                                    href="#"
                                    name="first"
                                    className={
                                      this.props.activePage.includes("first")
                                        ? "active"
                                        : ""
                                    }
                                    onClick={this.setPageNumber}
                                  >
                                    <span
                                      className="material-icons"
                                      data-icon="first_page"
                                    ></span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    name="before"
                                    className={
                                      this.props.activePage.includes("before")
                                        ? "active"
                                        : ""
                                    }
                                    onClick={this.setBeforePageValue}
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
                                    name={1}
                                    className={
                                      this.props.activePage.includes("1")
                                        ? "active"
                                        : ""
                                    }
                                    onClick={this.setPageNumber}
                                  >
                                    1
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    name={2}
                                    className={
                                      this.props.activePage.includes("2")
                                        ? "active"
                                        : ""
                                    }
                                    onClick={this.setPageNumber}
                                  >
                                    2
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    name={3}
                                    className={
                                      this.props.activePage.includes("3")
                                        ? "active"
                                        : ""
                                    }
                                    onClick={this.setPageNumber}
                                  >
                                    3
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    name="nextPage"
                                    className={
                                      this.props.activePage.includes("next")
                                        ? "active"
                                        : ""
                                    }
                                    onClick={this.setNextPageValue}
                                  >
                                    <span
                                      className="material-icons"
                                      data-icon="navigate_next"
                                    ></span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    name="last"
                                    className={
                                      this.props.activePage == "last"
                                        ? "active"
                                        : ""
                                    }
                                    onClick={this.setPageNumber}
                                  >
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
                                  <option value={15}>select No </option>
                                  <option value={25}>25</option>
                                  <option value={50}>50</option>
                                  <option value={100}>100</option>
                                  <option value={200}>200</option>
                                  <option value={500}>500</option>
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
              </form>
            </div>
          </div>
        </div>
        {/* </div> */}
        <NewPlayerSeachTable SearchData={this.state.data} />
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    paginationFirstValue: state.newplayer.paginationFirstValue,
    paginationSecondValue: state.newplayer.paginationSecondValue,
    sidebarTabs: state.sidebar.sidebarTabs,
    activePage: state.newplayer.activePage,
  };
}
export default connect(mapStateToProps)(newPlayer);
