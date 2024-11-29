import React from 'react';
import BoxThongKeBlack from '../Order/BoxThongKeBlack';

const BookInfringed = () => {
    return (
        <div className="page scroll-container">
            <div className="container">
                <div className='admin-home'>
                    <BoxThongKeBlack title={'Sách vi phạm'} value={'242'} image={'books.png'} cursor={'pointer'} />
                </div>
            </div>
        </div>
    );
};

export default BookInfringed;