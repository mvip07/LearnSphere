import Image from 'next/image';
import { useMemo, useRef } from 'react';
import { FaUpload, FaXmark } from 'react-icons/fa6';
import { ValidationErrors } from '@/types/general.t';
import { CreateQuestion, QuestionType } from '@/types/quiz.t';

interface MediaSectionProps {
    formData: CreateQuestion;
    questionType: QuestionType;
    validOrInvalid: ValidationErrors
    setFormData: React.Dispatch<React.SetStateAction<CreateQuestion>>;
}

export const MediaSection = ({ formData, questionType, setFormData, validOrInvalid }: MediaSectionProps) => {
    type MediaField = 'image' | 'video' | 'audio';
    const fileInputRef = useRef<HTMLInputElement>(null);

    const openFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({ ...prev, media: file }));
        }
    };

    const handleRemoveMedia = () => {
        setFormData((prev) => ({ ...prev, media: '' }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleUrlChange = (value: string) => {
        setFormData((prev) => ({ ...prev, media: value }));
    };

    const mediaField = useMemo(() => {
        return questionType as MediaField;
    }, [questionType]);

    if (!['image', 'video', 'audio'].includes(questionType)) return null;

    const acceptTypes = {
        image: 'image/png,image/jpeg,image/jpg',
        video: 'video/mp4',
        audio: 'audio/mpeg',
    };
    const placeholderText = {
        image: 'Enter Image URL',
        video: 'Enter Video URL',
        audio: 'Enter Audio URL',
    };
    const uploadText = {
        image: 'PNG, JPG, JPEG',
        video: 'MP4',
        audio: 'MP3',
    };

    return (
        <div className="mt-4">
            <label className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] font-medium capitalize inline-block">
                {mediaField.charAt(0).toUpperCase() + mediaField.slice(1)} Media
            </label>
            {formData.media ? (
                <div className="relative mt-2">
                    <button type="button" onClick={handleRemoveMedia} className="absolute top-2 right-2 z-10 w-[30px] h-[30px] bg-[var(--red)] text-[var(--whi)] rounded-full flex items-center justify-center" >
                        <FaXmark className='size-5 text-[var(--whi)] cursor-pointer' />
                    </button>
                    {formData.type === 'image' && (
                        <Image alt="Preview" src={typeof formData.media === 'string' ? formData.media : URL.createObjectURL(formData.media)} width={100} height={100} className="w-full h-48 object-cover border rounded" />
                    )}
                    {formData.type === 'video' && (
                        <video controls muted src={typeof formData.media === 'string' ? formData.media : URL.createObjectURL(formData.media)} className="w-full h-48 object-cover border rounded" />
                    )}
                    {formData.type === 'audio' && (
                        <audio controls muted src={typeof formData.media === 'string' ? formData.media : URL.createObjectURL(formData.media)} className="w-full border" />
                    )}
                    {validOrInvalid['media']?.map((error, idx) => (
                        <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1">{error}</p>
                    ))}
                </div>
            ) : (
                <>
                    <input value={formData.media} placeholder={placeholderText[mediaField]} className="input w-full outline-0 !py-2 mt-2" onChange={(e) => handleUrlChange(e.target.value)} />
                    <label className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] font-medium capitalize mt-4 inline-block">
                        Upload {mediaField.charAt(0).toUpperCase() + mediaField.slice(1)}
                    </label>
                    <div onClick={openFileInput} className="w-full bg-[var(--lg)] dark:bg-[var(--darkBorderCl)] py-7 px-4 mt-2 rounded-sm text-center border border-[var(--primary)] border-dashed cursor-pointer">
                        <div className="w-[40px] h-[40px] bg-[var(--whi)] dark:bg-[var(--darkBoxBg)] border border-[var(--whiLg)] dark:border-[var(--darkBorderCl)] rounded-full mx-auto flex items-center justify-center cursor-pointer">
                            <FaUpload className="size-5 text-[var(--primary)]" />
                        </div>
                        <p className="text-[14px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] font-medium leading-normal mt-4">
                            <a className="text-[var(--primary)]" href="#"> Click to upload </a>{' '}  or drag and drop <br /> {uploadText[mediaField]} <br /> (max, 800 X 800px)
                        </p>
                    </div>
                    {validOrInvalid['media']?.map((error, idx) => (
                        <p key={idx} className="text-[13px] text-[var(--error)] font-medium mt-1">{error}</p>
                    ))}
                    <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileUpload} accept={acceptTypes[mediaField]} />
                </>
            )}
        </div>
    );
};