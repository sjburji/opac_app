class Plan < ActiveRecord::Base
  def monthly_amount
    reading_fee + magazine_fee
  end
  
  def reading_fee_for_term(signUpMonths)
    freeMonths = signUpMonths/6
    monthly_amount * (signUpMonths - freeMonths)
  end
  
  def total_due_for_term(signUpMonths)
    security_deposit + registration_fee + reading_fee_for_term(signUpMonths)
  end
  
  def pay_months_for_term(signUpMonths)
    signUpMonths - signUpMonths/6
  end
end
