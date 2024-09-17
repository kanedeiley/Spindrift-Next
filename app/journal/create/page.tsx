
import FormInput from "@/components/form/FormInput"
import FormTextArea from "@/components/form/FormTextArea"
import FormContainer from "@/components/form/FormContainer"
import { createJournalAction } from "@/utils/actions"
import { SubmitButton } from "@/components/form/Buttons"
import FormSlider from "@/components/form/FormSlider"
import SelectInput from "@/components/form/SelectInput"
import FormDate from "@/components/form/FormDate"
import CategoriesInput from "@/components/form/CategoryInput"
import FormCounter from "@/components/form/FormCounter"
import ImageInput from "@/components/form/ImageInput"
import { Slider } from "@/components/ui/slider";




function JournalPage() {
  return (
    <section>
    <h1 className="text-2xl font-semibold mb-14 capitalize">create journal</h1>
    <div className="border p-8 rounded">
        <FormContainer action={createJournalAction}>
        <FormTextArea name='entry' placeholder="be as verbose as possible when describing the session." labelText='entry (describe your session to your hearts content.)'/>
        <FormDate label="Session Date" name="sessionStart" className="mt-12"/>
        <FormInput className="mt-8" name="sessionLength" type="number" placeholder="ex: 60" min={1} />
        <CategoriesInput className="mt-8" name="highlights" /> 
        <FormSlider className="mt-8" name="rating" defaultValue={[2]} max={5} step={1}  />
        <FormSlider label="Wave Height Rating" className="mt-8" name="heightRating" defaultValue={[3]} max={5} step={1}  />
        <FormSlider label="Fatigue Scale:" className="mt-8" name="fatigueRating" defaultValue={[4]} max={5} step={1}  />
        <SelectInput className="mt-8" name="boardType" label="Board Type"/>
        <SelectInput className="mt-8" name="finSetup" label="Fin Setup"/>
        <FormInput label="Board Liters" className="mt-8" name="boardLiters" type="number" placeholder="ex: 32" min={10}/>
        <FormInput label="Board Length" className="mt-8" name="boardLength" type="number" placeholder="ex: 65" min={40} />
        <CategoriesInput className="mt-8" name="swimwear" /> 
        <SubmitButton text='create journal' className="mt-12"/>
        </FormContainer>

    </div>
    </section>
     )
}

export default JournalPage