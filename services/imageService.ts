export const getAvatar = (file: any) =>{
    if(file && typeof file == 'string') return file
    if(file && typeof file == 'object') return file.url

    return require('@/assets/images/blankAvatar.png')
}