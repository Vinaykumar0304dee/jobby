import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'

class JobDetails extends Component {
  state = {jobItem: {}, isLoading: true}

  componentDidMount() {
    this.getJobDetails()
  }

  successRender = jobData => {
    console.log(jobData)
    const updatedData = {
      jobDetails: {
        companyLogoUrl: jobData.job_details.company_logo_url,
        companyWebsiteUrl: jobData.job_details.company_website_url,
        employmentType: jobData.job_details.employment_type,
        id: jobData.job_details.id,
        jobDescription: jobData.job_details.job_description,
        lifeAtCompany: {
          description: jobData.job_details.life_at_company.description,
          imageUrl: jobData.job_details.life_at_company.image_url,
        },
        location: jobData.job_details.location,
        packagePerAnnum: jobData.job_details.package_per_annum,
        rating: jobData.job_details.rating,
        skills: jobData.job_details.skills.map(eachitem => ({
          name: eachitem.name,
          imageUrl: eachitem.image_url,
        })),
      },
      similarJobs: jobData.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      })),
    }
    this.setState({jobItem: updatedData, isLoading: false})
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.successRender(data)
    }
  }

  renderJobDetail = () => {
    const {jobItem} = this.state
    const {jobDetails, similarJobs} = jobItem
    console.log(jobItem)
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
    } = jobDetails
    return (
      <div>
        <div>
          <img src={companyLogoUrl} alt="company logo" />
          <div>
            <h1>{employmentType}</h1>
            <p>{rating}</p>
          </div>
        </div>
        <div>
          <div>
            <p>{location}</p>
            <p>{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <div>
          <h1>Description</h1>
          <a href={companyWebsiteUrl}>visit</a>
        </div>
        <p>{jobDescription}</p>
        <h1>Skills</h1>
        <ul>
          {skills.map(eachitem => (
            <li key={eachitem.name}>
              <img src={eachitem.imageUrl} alt={eachitem.name} />
              <p>{eachitem.name}</p>
            </li>
          ))}
        </ul>
        <div>
          <div>
            <h1>Life at Company</h1>
            <p>{lifeAtCompany.description}</p>
          </div>
          <img src={lifeAtCompany.imageUrl} alt="life at company" />
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        <Header />
        <div>{isLoading ? <h1>loading</h1> : this.renderJobDetail()}</div>
      </div>
    )
  }
}

export default JobDetails
