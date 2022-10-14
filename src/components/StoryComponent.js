import React from 'react'
import StoryService from '../services/StoryService'

class StoryComponent extends React.Component {

    estimates = ['1', '2', '3', '5', '8', '13', 'no_idea'];

    constructor(){
        super()
        this.state = {
            stories:[],
            active: false,
            loading: false,
            active_story: {}
        }
    }

    handleSelect(id) {
        StoryService.setActive(id).then((response) => {
            this.setState({active: true, active_story: response.data})
        })
    }

    componentDidMount(){
        this.setState({loading: true})
        StoryService.getStories().then((response) => {
            response.data.forEach(story => {
                if(story.active) {
                    this.setState({active: true, active_story: story})
                }
            });
            this.setState({stories: response.data, loading: false})
        })
    }

    render(){
        return(
            this.state.loading ? <div>Loading...</div> : this.state.active ? 
            <div className="estimate-page">
                <h2>{this.state.active_story.name}</h2>
                <div className="estimates">
                    {
                        this.estimates.map(
                            point => <div className="card" key={point} onClick={() => this.props.sendEstimate(point, this.state.active_story)}>{point}</div>
                        )
                    }
                    <div className="card" onClick={() => this.props.Logout()}>resign.</div>
                </div>
                <div className="users">
                    {
                        
                    }
                </div>
            </div>:
            <div>
                <h2>Please select a story</h2>
                <select onChange={e => this.handleSelect(e.target.value)} defaultValue={'DEFAULT'} >
                    <option value="DEFAULT" disabled> -- select an option -- </option>
                    {
                        this.state.stories.map(
                            story => <option key={story.id} value={story.id}>{story.name}</option>
                        )
                    }
                </select>
            </div>
        )
    }
}

export default StoryComponent