import {Link} from 'react-router-dom'
import {TiStarFullOutline} from 'react-icons/ti'
import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <li>
      <Link to={`/jobs/${id}`}>
        <button className="list-item-btn" type="button">
          <div className="logo-title-container">
            <img className="logo-img" src={companyLogoUrl} alt="company name" />
            <div className="title-rating-container">
              <h1 className="title">{title}</h1>
              <div className="flex">
                <TiStarFullOutline style={{color: '#fbbf24'}} />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-container">
            <div className="jd-sub-container">
              <div className="flex">
                <IoLocationOutline />
                <p>{location}</p>
              </div>
              <p>
                <BsBriefcaseFill />
                {employmentType}
              </p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <h1 className="jd-heading">Description</h1>
          <p className="jd-description">{jobDescription}</p>
        </button>
      </Link>
    </li>
  )
}

export default JobItem
