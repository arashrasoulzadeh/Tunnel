<?php

		$str = new language;
		$lid = 1;
		if (!isset($_GET['id']))
		{
			$rnd=rand(1,9999999999);
			header('location: view?id='.$rnd);
		}
		else{

			if (isset($_GET['pm']))
			{

				header('location: view?id='.$_GET['id']);
			}else{

?>


<h2 class="page_title">قوانین</h2><div class="user_content" style="font-weight:normal; font-size: 12px;">
    <p>

    </p>
    <p style="font-weight:bold; font-size: 14px;">
        .هرجا کلماتی‌ نظیر زیپ یا ما به کار برده شده است منظور صاحب سایت
        می‌باشد. در طرف مقابل هرجا از کلماتی‌ نظیر من یا شما استفاده گردیده
        منظور کاربر یا شخص شما می‌باشد
    </p>
    <br>
    <div style="margin:5px; border: 1px solid silver; padding: 10px; background-color: #DEDEDE;">
        <h3>نکات مهم و قابل توجه</h3>



        <p style="font-weight:normal; font-size: 14px;">
            .شما هیچگونه اجازه‌ای جهت استفاده از لینک زیپی خود در سایتهای مشابه زیپ را ندارید &lt;
        </p>
        <p style="font-weight:normal; font-size: 14px;">
            .شما هیچگونه اجازه‌ای جهت استفاده از لینک‌های زیپی در سایتهای خلاف قوانین جمهوری اسلامی را ندارید &lt;
        </p>
        <p style="font-weight:normal; font-size: 14px;">
            .از مجبور کردن دوستان یا سایر کاربران جهت کلیک کردن بر روی لینکهای شما جهت کسب درآمد بیشتر جدا خودداری نمایید &lt;
        </p>
        <p style="font-weight:normal; font-size: 14px;">
            .از زیپ کردن مجدد لینکهای زیپ شده جدا خودداری نمائید &lt;
        </p>
        <p style="font-weight:normal; font-size: 14px;">
            .از زیپ کردن لینک مورد فاقد کپی‌ رایت خودداری نمائید &lt;
        </p>
        <p style="font-weight:normal; font-size: 14px;">
            .شما هیچگونه اجازه‌ای جهت باز کردن لینکهای خود در پاپ آپ، ای فریم یا اوتو ریدایرکت را ندارید &lt;
        </p>
        <p style="font-weight:normal; font-size: 14px;">
            .تنها روش قابل قبول برای کسب درامد کلیک بر روی لینک زیپی می‌باشد &lt;
        </p>
        <p style="font-weight:normal; font-size: 14px;">
            .شما مجاز به یکبار کلیک بر روی لینکهای زیپی خود جهت تست آنها میباشید &lt;
        </p>

        <p style="font-weight:bold; font-size: 14px;">
            .توجه: در صورت مشاهده هرگونه تخلف حساب کاربری شما مسدود کردیده و هیچگونه پرداختی به شما انجام نخواهد شد

        </p>
        <p style="font-weight:bold; font-size: 14px; color:red;">
            لازم به ذکر است قوانین زیپ بسته به شرایط بدون دادن اطلاع قبلی‌ به
            کاربران تغییر خواهد کرد، لذا شما همواره موظف به چک کردن قوانین قبل از
            زیپ کردن لینکهای خود میباشید
        </p>

    </div>
</div>










            <?php

            }
        }


?>