import React from "react";
import NewPlayerSeachTable from "./newPlayerTable";
import { connect } from "react-redux";
import { setSidebarTabs } from "../sidebar/sidebarSlice";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getNewPlayer,
  setPaginationFirstValue,
  setActivePage,
} from "./NewPlayerSlice";
import {
  brandsData,
  currencyData,
  countryData,
  inputFieldsData,
  paginationData,
  itemsToDisplay,
} from "./newPlayerData";
class newPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.dropDownClose = React.createRef();
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
      isActive: ["1"],
      brandsList: ["test"],
      document: "",
      people: [
        { name: "Keanu Reeves", profession: "Actor" },
        { name: "Lionel Messi", profession: "Football Player" },
        { name: "Cristiano Ronaldo", profession: "Football Player" },
        { name: "Jack Nicklaus", profession: "Golf Player" },
      ],
      dummydata: [
        { name: "Keanu Reeves", profession: "Actor" },
        { name: "Lionel Messi", profession: "Football Player" },
        { name: "Cristiano Ronaldo", profession: "Football Player" },
        { name: "Jack Nicklaus", profession: "Golf Player" },
      ],
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
    this.setFirstPage = this.setFirstPage.bind(this);
    this.setLastPage = this.setLastPage.bind(this);
    this.setItemsToDisplay = this.setItemsToDisplay.bind(this);
    this.myDocument = this.myDocument.bind(this);
    this.exportPDF = this.exportPDF.bind(this);
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
    this.setState({ brand: e.target.value });
    this.state.brandsList.push(e.target.value);
    this.setState({ open: false });
  };

  handleClickDropdown = () => {
    this.setState({ open: !this.state.open });
  };

  exportPDF() {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "My Awesome Report";
    const headers = [["NAME", "PROFESSION"]];

    const data = this.state.people.map((elt) => [elt.name, elt.profession]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    //  doc.autoTable(content);
    doc.save("report.pdf");
  }

  myDocument(e) {
    this.setState({ document: e.target.value });
  }

  // pagination functions //

  callAPi(value) {
    this.props.dispatch(
      getNewPlayer(value, this.props.paginationSecondValue, {})
    );
  }
  setFirstPage = () => {
    this.props.dispatch(setPaginationFirstValue(1));
    this.props.dispatch(setActivePage(["1", "firstPage"]));
    this.callAPi(1);
  };
  setLastPage = () => {};
  setPageNumber(e) {
    this.props.dispatch(setPaginationFirstValue(Number(e.target.name)));
    this.props.dispatch(setActivePage([e.target.name, "none"]));
    this.callAPi(this.props.paginationFirstValue);
  }
  setNextPageValue() {
    this.props.dispatch(
      setPaginationFirstValue(this.props.paginationFirstValue + 1)
    );
    this.props.dispatch(
      setActivePage([
        (this.props.paginationFirstValue + 1).toString(),
        "nextPage",
      ])
    );
    this.callAPi(this.props.paginationFirstValue);
  }

  setBeforePageValue() {
    if (this.props.paginationFirstValue > 1) {
      this.props.dispatch(
        setPaginationFirstValue(this.props.paginationFirstValue - 1)
      );
      this.props.dispatch(
        setActivePage([
          (this.props.paginationFirstValue - 1).toString(),
          "previousPage",
        ])
      );
      this.callAPi(this.props.paginationFirstValue);
    }
  }
  // pagination functions //

  setItemsToDisplay = (e) => {
    this.props.dispatch(
      getNewPlayer(this.props.paginationFirstValue, e.target.value, {})
    );
  };
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
    this.setState({ brandsList: [] });
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
        brandsList: this.state.brandsList,
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
      this.dropDownClose.current &&
      !this.dropDownClose.current.contains(e.target)
    ) {
      this.setState({ open: false });
    }
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  render() {
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
                                ref={this.dropDownClose}
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
                                  {brandsData.map((cur, ind) => {
                                    return (
                                      <div
                                        className="CMS-checkbox"
                                        key={cur.id}
                                      >
                                        <input
                                          id={cur.id}
                                          type="checkbox"
                                          value={cur.value}
                                          onClick={this.brandHandler}
                                        />
                                        <label htmlFor={cur.id}></label>
                                        <span className="SB-checkboxLabel">
                                          {cur.value}
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
                                    {currencyData.map((cur, ind) => {
                                      return (
                                        <option key={cur.id} value={cur.name}>
                                          {cur.name}
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
                                    {countryData.map((cur, ind) => {
                                      return (
                                        <option key={cur.id} value={cur.name}>
                                          {cur.name}
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
                          {inputFieldsData.map((item, ind) => {
                            const values = [
                              this.state.affiliateBTAG,
                              this.state.affiliateName,
                              this.state.firstName,
                              this.state.lastName,
                            ];
                            return (
                              <div className="col-3" key={item.name}>
                                <div className="CMS-formGroup">
                                  <div className="CMS-formLabel">
                                    {item.class}
                                  </div>
                                  <div className="CMS-formControl">
                                    <input
                                      type="text"
                                      name={item.name}
                                      placeholder={item.class}
                                      value={values[ind]}
                                      onChange={this.onChangeHandler}
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
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
                                {paginationData.map((page, ind) => {
                                  const handler = [
                                    this.setFirstPage,
                                    this.setBeforePageValue,
                                    this.setPageNumber,
                                    this.setPageNumber,
                                    this.setPageNumber,
                                    this.setNextPageValue,
                                    this.setLastPage,
                                  ];
                                  return (
                                    <li key={page.id}>
                                      <a
                                        href="#"
                                        className={
                                          this.props.activePage.includes(
                                            page.name
                                          )
                                            ? "active"
                                            : ""
                                        }
                                        name={page.name}
                                        onClick={handler[ind]}
                                      >
                                        {page.name.length > 2 ? (
                                          <span
                                            className="material-icons"
                                            data-icon={page.icon}
                                          ></span>
                                        ) : (
                                          page.name
                                        )}
                                      </a>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>

                            <div className="CMS-page-slection">
                              <div className="CMS-number-of-files CMS-select">
                                <select
                                  id="country"
                                  name="File"
                                  onChange={this.setItemsToDisplay}
                                >
                                  {itemsToDisplay.map((cur, ind) => {
                                    return (
                                      <option value={cur.value} key={cur.id}>
                                        {cur.value}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div className="CMS-file-type CMS-select">
                                <select
                                  id="country"
                                  name="File"
                                  onChange={this.myDocument}
                                >
                                  <option value="PDF">PDF</option>
                                  <option value="CSV">CSV</option>
                                  {/* <option value="XLS">XLS</option> */}
                                </select>
                              </div>
                              <div className="CMS-download-icon">
                                {this.state.document === "CSV" ? (
                                  <CSVLink
                                    style={{ textDecoration: "none" }}
                                    data={this.state.dummydata}
                                    // I also tried adding the onClick event on the link itself
                                    filename={"my-file.csv"}
                                    target="_blank"
                                  >
                                    <a>
                                      <span
                                        className="material-icons"
                                        data-icon="file_download"
                                      ></span>
                                    </a>
                                  </CSVLink>
                                ) : (
                                  <a onClick={() => this.exportPDF()}>
                                    <span
                                      className="material-icons"
                                      data-icon="file_download"
                                    ></span>
                                  </a>
                                )}
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
