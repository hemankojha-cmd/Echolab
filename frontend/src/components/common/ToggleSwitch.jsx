export default function ToggleSwitch({

    checked,

    onChange,

    disabled = false,

    leftText = "OFF",

    rightText = "ON"

}) {

    return (

        <div className="toggle-container">

            <span>{leftText}</span>

            <button

                type="button"

                className={

                    checked

                        ? "toggle active"

                        : "toggle"

                }

                onClick={onChange}

                disabled={disabled}

                aria-pressed={checked}

            >

                <div className="toggle-circle" />

            </button>

            <span>{rightText}</span>

        </div>

    );

}