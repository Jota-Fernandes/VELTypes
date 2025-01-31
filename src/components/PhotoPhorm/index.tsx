import { TitlePhotoForm, PhotoForm } from "./styles";
import { ButtonIcon } from "../ButtonIcon";

type Props = {
    title: string
}

export function PhotoPhorm({title}: Props) {
    return (
        <PhotoForm>
            <TitlePhotoForm>{title}</TitlePhotoForm>
            <ButtonIcon 
                icon="camera-alt" 
            />
        </PhotoForm>
    )
}