import { Puff } from 'react-loading-icons'

const SyncModal = (props) => {
    const toBlur = document.getElementsByClassName('blur');
    if (!props.visible) {
        for (var i = 0; i < toBlur.length; i++)
        toBlur[i].style.filter = 'none';
        return;
    }
    for (var i = 0; i < toBlur.length; i++)
        toBlur[i].style.filter = 'blur(2px)';
    return (
        <div className='sync-modal-wrapper'>
            <div className='sync-modal'>
                { (props.progress == 0 || props.progress == null) &&
                    <div className='center-wrapper'>
                        <h3>Downloading Menus</h3>
                        <Puff stroke='black'/>
                    </div>
                }
                { (props.progress != 0 && props.progress != null) &&
                    <div className='center-wrapper'>
                        <h3>Syncing Menus</h3>
                        <div className='prog-container'>
                            <div className='prog-bar'
                                style={ {width: props.progress*100 + '%'} }/>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default SyncModal;