import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoSearch} from 'react-icons/io5'
import JobItem from '../JobItem'
import Header from '../Header'
import './index.css'

class Jobs extends Component {
  state = {
    userDetails: '',
    jobsList: [],
    duplicateList: [],
    selectedSalary: '',
    selectedEmploymentType: [],
    isLoading: true,
    userSearch: '',
  }

  componentDidMount() {
    this.getUserProfileDetail()
    this.getJobsData()
  }

  getJobsData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {selectedSalary, selectedEmploymentType} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${selectedEmploymentType}&minimum_package=${selectedSalary}&search=`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsList: updatedData,
        duplicateList: updatedData,
        isLoading: false,
      })
    }
  }

  onSelectSalaryRange = event => {
    this.setState({selectedSalary: event.target.value}, this.getJobsData)
  }

  onSelectedItem = event => {
    const {checked, value} = event.target
    console.log(checked, value)
    this.setState(prevState => {
      let updatedList
      if (checked) {
        updatedList = [...prevState.selectedEmploymentType, value]
      } else {
        updatedList = prevState.selectedEmploymentType.filter(
          item => item !== value,
        )
      }
      return {selectedEmploymentType: updatedList}
    }, this.getJobsData)
  }

  onSearchUser = event => {
    const {userSearch, duplicateList} = this.state
    if (userSearch === '') {
      this.setState({jobsList: duplicateList})
    }
    this.setState({userSearch: event.target.value})
  }

  onClickSearch = () => {
    const {userSearch, duplicateList} = this.state
    const updatedList = duplicateList.filter(item =>
      item.title.toLowerCase().includes(userSearch.toLowerCase()),
    )
    this.setState({jobsList: updatedList})
  }

  onSuccessUserDetails = userProfile => {
    const updatedDetails = {
      profileImageUrl: userProfile.profile_image_url,
      name: userProfile.name,
      shortBio: userProfile.short_bio,
    }
    this.setState({userDetails: updatedDetails})
  }

  getUserProfileDetail = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearear ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessUserDetails(data.profile_details)
    }
  }

  render() {
    const {
      userDetails,
      selectedSalary,
      selectedEmploymentType,
      jobsList,
      isLoading,
      userSearch,
    } = this.state
    const {employmentTypesList, salaryRangesList} = this.props
    return (
      <div>
        <Header />
        <div className="jobs-container">
          <div className="jobs-left-sec">
            <div className="profile-container">
              <img
                className="profile-img"
                src={userDetails.profileImageUrl}
                alt="user profile"
              />
              <h1 className="profile-heading">{userDetails.name}</h1>
              <p className="profile-bio">{userDetails.shortBio}</p>
            </div>
            <hr />
            <h1 className="jobs-select-sec-heading">Type of Employment</h1>
            <ul className="list-container">
              {employmentTypesList.map(eachItem => (
                <li key={eachItem.employmentTypeId}>
                  <input
                    type="checkBox"
                    value={eachItem.employmentTypeId}
                    checked={selectedEmploymentType.includes(
                      eachItem.employmentTypeId,
                    )}
                    onChange={this.onSelectedItem}
                    id={eachItem.employmentTypeId}
                  />
                  <label htmlFor={eachItem.employmentTypeId}>
                    {eachItem.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr />
            <h1 className="jobs-select-sec-heading">Salary Range</h1>
            <ul className="list-container">
              {salaryRangesList.map(eachItem => (
                <li key={eachItem.salaryRangeId}>
                  <input
                    type="radio"
                    value={eachItem.salaryRangeId}
                    checked={selectedSalary === eachItem.salaryRangeId}
                    onChange={this.onSelectSalaryRange}
                    id={eachItem.salaryRangeId}
                  />
                  <label htmlFor={eachItem.salaryRangeId}>
                    {eachItem.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="search-container">
              <input
                className="search-input"
                placeholder="search"
                type="search"
                value={userSearch}
                onChange={this.onSearchUser}
              />
              <button
                className="search-btn"
                type="button"
                onClick={this.onClickSearch}
              >
                <IoSearch />
              </button>
            </div>
            <ul className="list-container">
              {isLoading ? (
                <p>loading</p>
              ) : (
                jobsList.map(eachItem => (
                  <JobItem key={eachItem.id} jobDetails={eachItem} />
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
