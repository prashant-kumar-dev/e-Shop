import React from 'react'

const CommonSpinner = () => {
    return (
        <>
            <div className="spinner-container" style={{ gridColumn: '1 / -1' }}>
                <div className="spinner"></div>
                <style>
                    {`
                                .spinner-container {
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    height: 400px; /* Adjust the height as needed */
                                }
                                .spinner {
                                    border: 4px solid rgba(0, 0, 0, 0.1);
                                    border-left-color: #4a90e2;
                                    border-radius: 50%;
                                    width: 40px;
                                    height: 40px;
                                    animation: spin 1s linear infinite;
                                }
                                @keyframes spin {
                                    to {
                                        transform: rotate(360deg);
                                    }
                                }
                            `}
                </style>
            </div>
        </>
    )
}

export default CommonSpinner
