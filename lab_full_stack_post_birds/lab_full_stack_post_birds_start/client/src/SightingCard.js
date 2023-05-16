import { deleteSighting, putSighting, postSighting, updateSighting } from "./SightingService";
import { onChange } from "./SightingsForm";
import {useState} from "react"

const SightingCard = ({sighting, removeSighting}) => {

    const [buttonClicked, setButtonClicked] = useState(false)

    const handleEdit = () => {
      setButtonClicked(!buttonClicked)
    }

    console.log(sighting);
    const handleDelete = () => {
        deleteSighting(sighting._id).then(()=>{
            removeSighting(sighting._id);
        })
    }

    const [formData, setFormData] = useState(sighting)

    const onChange = (e) =>{
        const newFormData = Object.assign({}, formData);
        newFormData[e.target.name] = e.target.value;
        setFormData(newFormData);
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        delete formData._id
        updateSighting(formData, sighting._id)
        // .then((data)=>{
        //     // addSighting(data);
        // })
    }

    return (
            <div>
            
            { 
            
            buttonClicked 

            ? 

            <form onSubmit={onSubmit} id="sightings-form">
            <h2>Add a Sighting</h2>
            <div className="formWrap">
                <label htmlFor="species">Species:</label>
                <input 
                    onChange={onChange} 
                    type="text" 
                    id="species" 
                    name="species"
                    value={formData.species} />
            </div>
            <div className="formWrap">
                <label htmlFor="location">Location:</label>
                <input 
                    onChange={onChange} 
                    type="text" 
                    id="location" 
                    name="location"
                    value={formData.location} />
            </div>
            <div className="formWrap">
                <label htmlFor="date">Date:</label>
                <input 
                    onChange={onChange} 
                    type="date" 
                    id="date" 
                    name="date" 
                    value={formData.date}/>
            </div>

            <input type="submit" value="Save" id="save"/>
            <button onClick={handleEdit}>Back</button>
	    </form>
            
            :
            
            <div>
            <h1>{sighting.species}</h1>
            <p>Location: {sighting.location}</p>
            <p>Date: {sighting.date}</p>
            <button onClick={handleDelete}> 🗑 </button>
            <button onClick={handleEdit}>update</button>
        </div>
        
        }
            <hr></hr>
        </div>
    )
}

export default SightingCard;